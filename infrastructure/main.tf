terraform {
  required_version = ">= 1.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }

  backend "azurerm" {
    # Backend configuration can be provided via:
    # 1. Backend-config flags during terraform init (recommended for CI/CD)
    # 2. Variables in terraform.tfvars (if using partial configuration)
    # 3. Environment variables (ARM_*)
    #
    # Example backend-config usage:
    # terraform init -backend-config="resource_group_name=terraform-state-rg" \
    #                -backend-config="storage_account_name=pghportfoliostorage" \
    #                -backend-config="container_name=tfstate" \
    #                -backend-config="key=portfolio.terraform.tfstate"
    #
    # Note: If using GitHub Actions workflow, configure these values as secrets:
    # - TERRAFORM_STATE_RESOURCE_GROUP
    # - TERRAFORM_STATE_STORAGE_ACCOUNT
    # - TERRAFORM_STATE_CONTAINER
    # - TERRAFORM_STATE_KEY
  }
}

provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
}

# Resource Group
resource "azurerm_resource_group" "portfolio" {
  name     = var.resource_group_name
  location = var.location

  tags = var.tags
}

# Application Insights for monitoring and analytics
resource "azurerm_application_insights" "portfolio" {
  name                = "${var.project_name}-appinsights"
  location            = azurerm_resource_group.portfolio.location
  resource_group_name = azurerm_resource_group.portfolio.name
  application_type    = "web"
  workspace_id        = azurerm_log_analytics_workspace.portfolio.id

  tags = var.tags
}

# Log Analytics Workspace
resource "azurerm_log_analytics_workspace" "portfolio" {
  name                = "${var.project_name}-logs"
  location            = azurerm_resource_group.portfolio.location
  resource_group_name = azurerm_resource_group.portfolio.name
  sku                 = "PerGB2018"
  retention_in_days   = 30

  tags = var.tags
}

# App Service Plan for Backend API
resource "azurerm_service_plan" "backend" {
  name                = "${var.project_name}-backend-plan"
  resource_group_name = azurerm_resource_group.portfolio.name
  location            = azurerm_resource_group.portfolio.location
  os_type             = "Linux"
  sku_name            = var.backend_sku

  tags = var.tags
}

# App Service for Backend API (.NET Core)
resource "azurerm_linux_web_app" "backend" {
  name                = "${var.project_name}-api-${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.portfolio.name
  location            = azurerm_service_plan.backend.location
  service_plan_id     = azurerm_service_plan.backend.id

  site_config {
    application_stack {
      dotnet_version = "8.0"
    }
    always_on = true
    health_check_path = "/api/health"
    health_check_interval = 60
  }

  app_settings = {
    "ASPNETCORE_ENVIRONMENT"           = var.environment
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.portfolio.connection_string
    "APPINSIGHTS_INSTRUMENTATIONKEY"   = azurerm_application_insights.portfolio.instrumentation_key
    # CORS configuration: Dynamically set to allow requests from the Static Web App frontend
    # Terraform will ensure the frontend is created before setting this value
    "CORS_ALLOWED_ORIGINS"             = "https://${azurerm_static_web_app.frontend.default_host_name}"
  }

  https_only = true

  tags = var.tags
}

# Static Web App for Frontend (React)
resource "azurerm_static_web_app" "frontend" {
  name                = "${var.project_name}-web-${random_string.suffix.result}"
  resource_group_name = azurerm_resource_group.portfolio.name
  location            = "West Europe 2"
  sku_tier            = "Free"
  sku_size            = "Free"

  app_settings = {
    "VITE_API_URL" = "https://${azurerm_linux_web_app.backend.default_site_hostname}/api"
  }

  tags = var.tags
}

# Random string for unique resource names
resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

# Outputs
output "backend_url" {
  value       = "https://${azurerm_linux_web_app.backend.default_site_hostname}"
  description = "Backend App Service URL"
}

output "backend_api_url" {
  value       = "https://${azurerm_linux_web_app.backend.default_site_hostname}/api"
  description = "Backend API URL (with /api path)"
}

output "frontend_url" {
  value       = "https://${azurerm_static_web_app.frontend.default_host_name}"
  description = "Frontend Static Web App URL"
}

output "application_insights_connection_string" {
  value       = azurerm_application_insights.portfolio.connection_string
  description = "Application Insights connection string"
  sensitive   = true
}

output "application_insights_instrumentation_key" {
  value       = azurerm_application_insights.portfolio.instrumentation_key
  description = "Application Insights instrumentation key"
  sensitive   = true
}

output "backend_app_service_name" {
  value       = azurerm_linux_web_app.backend.name
  description = "Backend App Service name (for deployment workflows)"
}
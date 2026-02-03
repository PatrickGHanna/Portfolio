variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "portfolio-rg"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "West US"
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
  default     = "portfolio"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "backend_sku" {
  description = "SKU for the backend App Service Plan. Use F1 (Free) for free subscriptions, B1 (Basic) for paid subscriptions"
  type        = string
  default     = "F1"
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default = {
    Environment = "Production"
    Project     = "Portfolio"
    ManagedBy   = "Terraform"
  }
}

# Terraform backend configuration variables
# These can be provided via terraform.tfvars or backend-config flags
variable "terraform_backend_resource_group_name" {
  description = "Resource group name for Terraform state storage"
  type        = string
  default     = ""
}

variable "terraform_backend_storage_account_name" {
  description = "Storage account name for Terraform state"
  type        = string
  default     = ""
}

variable "terraform_backend_container_name" {
  description = "Container name for Terraform state"
  type        = string
  default     = "tfstate"
}

variable "terraform_backend_key" {
  description = "Key name for Terraform state file"
  type        = string
  default     = "portfolio.terraform.tfstate"
}
variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
  default     = "portfolio-rg"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "East US"
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
  description = "SKU for the backend App Service Plan"
  type        = string
  default     = "B1"
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

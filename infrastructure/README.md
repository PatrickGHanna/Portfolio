# Portfolio Infrastructure

This directory contains Terraform configuration for deploying the portfolio website to Azure.

## Prerequisites

1. **Azure CLI** installed and configured
   - Download from [docs.microsoft.com/cli/azure/install-azure-cli](https://docs.microsoft.com/cli/azure/install-azure-cli)

2. **Terraform** installed (version >= 1.0)
   - Download from [terraform.io/downloads](https://www.terraform.io/downloads)

3. **Azure Authentication** - Choose one method below

## Authentication Setup

Terraform requires authentication to Azure. You have three options:

### Option 1: Service Principal Authentication (Recommended for CI/CD)

If you're authenticated as a Service Principal via Azure CLI, you must use environment variables:

1. **Get your Service Principal credentials**:
   ```bash
   # If you have the JSON output from service principal creation, extract:
   # - clientId (becomes ARM_CLIENT_ID)
   # - clientSecret (becomes ARM_CLIENT_SECRET)
   # - tenantId (becomes ARM_TENANT_ID)
   # - subscriptionId (becomes ARM_SUBSCRIPTION_ID)
   
   # Or get current account info:
   az account show
   ```

2. **Set environment variables** (PowerShell):
   ```powershell
   $env:ARM_CLIENT_ID = "your-client-id"
   $env:ARM_CLIENT_SECRET = "your-client-secret"
   $env:ARM_TENANT_ID = "your-tenant-id"
   $env:ARM_SUBSCRIPTION_ID = "your-subscription-id"
   ```

   Or (Command Prompt):
   ```cmd
   set ARM_CLIENT_ID=your-client-id
   set ARM_CLIENT_SECRET=your-client-secret
   set ARM_TENANT_ID=your-tenant-id
   set ARM_SUBSCRIPTION_ID=your-subscription-id
   ```

3. **Verify authentication**:
   ```bash
   terraform init
   ```

### Option 2: Azure CLI with User Account

If you want to use Azure CLI authentication, you must be logged in as a **User Account** (not Service Principal):

1. **Logout from Service Principal** (if currently logged in):
   ```bash
   az logout
   ```

2. **Login as User Account**:
   ```bash
   az login
   az account set --subscription "Your Subscription ID"
   ```

3. **Verify**:
   ```bash
   az account show
   # Should show "user" type, not "servicePrincipal"
   ```

### Option 3: Create a New Service Principal

If you need to create a Service Principal for Terraform:

```bash
# Create Service Principal with Contributor role
az ad sp create-for-rbac --name "terraform-portfolio" --role contributor --scopes /subscriptions/{subscription-id} --sdk-auth

# Save the JSON output - you'll need:
# - clientId → ARM_CLIENT_ID
# - clientSecret → ARM_CLIENT_SECRET
# - tenantId → ARM_TENANT_ID
# - subscriptionId → ARM_SUBSCRIPTION_ID
```

Then set the environment variables as shown in Option 1.

## Resources Created

- **Resource Group**: Container for all resources
- **Application Insights**: Monitoring, analytics, and health checks
- **Log Analytics Workspace**: Centralized logging
- **App Service Plan**: Hosting plan for backend API
- **Linux Web App**: Backend API (.NET Core)
- **Static Web App**: Frontend (React)

## Deployment Steps

1. **Copy the example variables file**
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

2. **Edit terraform.tfvars** with your values
   - Update `resource_group_name`, `location`, `project_name`
   - Adjust `backend_sku` based on your needs (B1 for basic, S1 for standard)

3. **Initialize Terraform**
   ```bash
   terraform init
   ```

4. **Review the plan**
   ```bash
   terraform plan
   ```

5. **Apply the configuration**
   ```bash
   terraform apply
   ```

6. **Note the outputs**
   - Backend URL
   - Frontend URL
   - Application Insights connection details

## Monitoring and Analytics

The infrastructure includes:

- **Application Insights**: 
  - Page view tracking
  - Performance monitoring
  - Error tracking
  - Custom events

- **Health Checks**:
  - Configured on `/api/health` endpoint
  - Checks every 60 seconds
  - Automatic failover if unhealthy

- **Log Analytics**:
  - Centralized logging
  - 30-day retention
  - Query and analyze logs

## Updating the Deployment

After making changes to the infrastructure code:

```bash
terraform plan
terraform apply
```

## Destroying Resources

To remove all resources:

```bash
terraform destroy
```

**Warning**: This will delete all resources. Make sure you have backups if needed.

## Backend State Storage (Optional)

For team collaboration, configure remote state storage:

1. Create a storage account and container in Azure
2. Uncomment and configure the backend block in `main.tf`
3. Update `terraform.tfvars.example` with your storage details

## Cost Optimization

- **Free Tier**: Static Web App is free
- **Basic Tier**: App Service Plan B1 is low cost
- **Monitoring**: Application Insights has a free tier (5GB/month)

## Troubleshooting

### Authentication Issues

**Error: "Authenticating using the Azure CLI is only supported as a User (not a Service Principal)"**

This means you're logged into Azure CLI as a Service Principal. You have two options:

1. **Use Service Principal authentication** (set environment variables):
   ```powershell
   # PowerShell
   $env:ARM_CLIENT_ID = "your-client-id"
   $env:ARM_CLIENT_SECRET = "your-client-secret"
   $env:ARM_TENANT_ID = "your-tenant-id"
   $env:ARM_SUBSCRIPTION_ID = "your-subscription-id"
   ```

2. **Switch to User Account**:
   ```bash
   az logout
   az login  # Login with your user account
   az account show  # Verify it shows "user" type
   ```

**Check current authentication**:
```bash
az account show
# Look for "type": "user" or "type": "servicePrincipal"
```

**Verify environment variables are set**:
```powershell
# PowerShell
$env:ARM_CLIENT_ID
$env:ARM_TENANT_ID
```

### State Lock Issues
If Terraform state is locked, check for running operations or manually unlock:
```bash
terraform force-unlock <LOCK_ID>
```

### Resource Naming Conflicts
Azure resource names must be globally unique. The configuration uses random suffixes to avoid conflicts.

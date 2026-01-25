# Portfolio Infrastructure

This directory contains Terraform configuration for deploying the portfolio website to Azure.

## Prerequisites

1. **Azure CLI** installed and configured
   ```bash
   az login
   az account set --subscription "Your Subscription ID"
   ```

2. **Terraform** installed (version >= 1.0)
   - Download from [terraform.io](https://www.terraform.io/downloads)

3. **Service Principal** (for CI/CD) or use your Azure account credentials

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
```bash
az login
az account show
```

### State Lock Issues
If Terraform state is locked, check for running operations or manually unlock:
```bash
terraform force-unlock <LOCK_ID>
```

### Resource Naming Conflicts
Azure resource names must be globally unique. The configuration uses random suffixes to avoid conflicts.

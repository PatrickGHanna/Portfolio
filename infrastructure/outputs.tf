# Outputs are defined in main.tf
# 
# Available outputs:
# - backend_url: Backend App Service URL
# - backend_api_url: Backend API URL (with /api path) - Use this for VITE_API_URL
# - frontend_url: Frontend Static Web App URL - Use this for CORS_ALLOWED_ORIGINS
# - application_insights_connection_string: Application Insights connection string (sensitive)
# - application_insights_instrumentation_key: Application Insights instrumentation key (sensitive)
#
# These outputs are used by the GitHub Actions deployment workflows

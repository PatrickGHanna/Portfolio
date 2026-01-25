# Portfolio API - Backend

.NET 8.0 Web API for the portfolio website.

## Features

- RESTful API endpoints for all portfolio pages
- Application Insights integration
- Health check endpoint
- CORS configuration for frontend
- Repository pattern ready for database integration
- Swagger/OpenAPI documentation

## Getting Started

### Prerequisites

- .NET 8.0 SDK

### Running the Application

```bash
dotnet restore
dotnet run
```

The API will be available at:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`
- Swagger: `https://localhost:5001/swagger`

## API Endpoints

### Home
- `GET /api/home` - Get homepage data

### About
- `GET /api/about` - Get about page data

### Resume
- `GET /api/resume` - Get resume data

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get project by ID

### Health
- `GET /api/health` - Health check endpoint

## Configuration

### Application Insights

Add your Application Insights connection string to `appsettings.json`:

```json
{
  "ApplicationInsights": {
    "ConnectionString": "your-connection-string"
  }
}
```

Or set it via environment variable:
```bash
APPLICATIONINSIGHTS_CONNECTION_STRING=your-connection-string
```

### CORS

CORS is configured to allow requests from:
- `http://localhost:3000` (development)
- `https://localhost:3000` (development)
- Origins specified in `CORS_ALLOWED_ORIGINS` environment variable (production)

## Database Integration

The codebase uses a repository pattern that makes it easy to add a database:

1. The `IRepository<T>` interface defines the contract
2. `Repository<T>` is currently an in-memory implementation
3. To add Entity Framework Core:
   - Install EF Core packages
   - Create a `DbContext`
   - Update `Repository<T>` to use the `DbContext`
   - Register the `DbContext` in `Program.cs`

## Project Structure

```
Portfolio.Api/
├── Controllers/        # API controllers
│   ├── HomeController.cs
│   ├── AboutController.cs
│   ├── ResumeController.cs
│   ├── ProjectsController.cs
│   └── HealthController.cs
├── Models/            # Data models
│   └── BaseEntity.cs
├── Services/          # Business logic
│   ├── IRepository.cs
│   └── Repository.cs
├── Program.cs         # Application entry point
└── appsettings.json   # Configuration
```

## Building for Production

```bash
dotnet publish -c Release -o ./publish
```

## Deployment

See the main [README.md](../README.md) for Azure deployment instructions.

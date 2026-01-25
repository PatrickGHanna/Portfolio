# Portfolio Website

A modern, mobile-friendly portfolio website built with .NET Core backend and React frontend, designed for deployment on Azure with comprehensive monitoring and analytics.

## 🚀 Features

- **Homepage**: Welcome section with hero content and feature highlights
- **About Me**: Personal information, skills, and contact details
- **Resume**: Professional experience, education, and certifications
- **Projects**: Showcase of portfolio projects with links and technologies
- **Mobile Responsive**: Fully responsive design for all device sizes
- **Azure Integration**: Ready for Azure deployment with Application Insights
- **Health Checks**: Built-in health monitoring endpoints
- **Infrastructure as Code**: Terraform configuration for Azure resources

## 🏗️ Architecture

### Backend
- **.NET 8.0** with C# latest features
- RESTful API with controllers for each page
- Application Insights integration for monitoring
- Repository pattern ready for database integration
- Health check endpoints

### Frontend
- **React 18** with React Router
- **Vite** for fast development and building
- Mobile-first responsive design
- API integration with Axios
- Modern CSS with animations

### Infrastructure
- **Terraform** for infrastructure as code
- Azure App Service for backend
- Azure Static Web Apps for frontend
- Application Insights for analytics and monitoring
- Log Analytics for centralized logging

## 📁 Project Structure

```
.
├── backend/
│   └── Portfolio.Api/          # .NET Core API
│       ├── Controllers/          # API controllers
│       ├── Models/              # Data models
│       ├── Services/            # Business logic and repositories
│       └── Program.cs          # Application entry point
├── frontend/                     # React application
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Page components
│   │   ├── services/            # API service layer
│   │   └── App.jsx              # Main app component
│   └── package.json
└── infrastructure/              # Terraform configuration
    ├── main.tf                  # Main infrastructure code
    ├── variables.tf             # Variable definitions
    └── README.md                # Infrastructure documentation
```

## 🛠️ Prerequisites

- **.NET 8.0 SDK** - [Download](https://dotnet.microsoft.com/download)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Azure CLI** (for deployment) - [Download](https://docs.microsoft.com/cli/azure/install-azure-cli)
- **Terraform** (for infrastructure) - [Download](https://www.terraform.io/downloads)

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend/Portfolio.Api
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the API:
   ```bash
   dotnet run
   ```

   The API will be available at:
   - HTTP: `http://localhost:5000`
   - HTTPS: `https://localhost:5001`
   - Swagger UI: `https://localhost:5001/swagger`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

### Running Both Services

1. Start the backend API (in one terminal):
   ```bash
   cd backend/Portfolio.Api
   dotnet run
   ```

2. Start the frontend (in another terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser to `http://localhost:3000`

## 📝 Configuration

### Backend Configuration

Edit `appsettings.json` or `appsettings.Development.json`:

```json
{
  "ApplicationInsights": {
    "ConnectionString": "your-connection-string"
  }
}
```

### Frontend Configuration

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, this will be set automatically by Azure Static Web Apps.

## 🗄️ Database Integration (Future)

The codebase is structured to easily integrate a database:

1. **Repository Pattern**: Already implemented in `Services/Repository.cs`
2. **Base Entity**: `Models/BaseEntity.cs` provides common fields
3. **Interface-Based**: `IRepository<T>` allows easy swapping of implementations

To add Entity Framework Core:

1. Install packages:
   ```bash
   dotnet add package Microsoft.EntityFrameworkCore
   dotnet add package Microsoft.EntityFrameworkCore.SqlServer
   ```

2. Create a `DbContext`:
   ```csharp
   public class PortfolioDbContext : DbContext
   {
       public DbSet<Project> Projects { get; set; }
       // Add other DbSets
   }
   ```

3. Update `Repository<T>` to use `DbContext` instead of in-memory storage

4. Register in `Program.cs`:
   ```csharp
   builder.Services.AddDbContext<PortfolioDbContext>(options =>
       options.UseSqlServer(connectionString));
   ```

## 🚀 Deployment to Azure

See the [Infrastructure README](./infrastructure/README.md) for detailed deployment instructions.

Quick deployment steps:

1. **Configure Terraform**:
   ```bash
   cd infrastructure
   cp terraform.tfvars.example terraform.tfvars
   # Edit terraform.tfvars with your values
   ```

2. **Deploy Infrastructure**:
   ```bash
   terraform init
   terraform plan
   terraform apply
   ```

3. **Deploy Backend**:
   ```bash
   cd backend/Portfolio.Api
   dotnet publish -c Release
   # Use Azure CLI or VS Code extension to deploy
   ```

4. **Deploy Frontend**:
   ```bash
   cd frontend
   npm run build
   # Deploy dist/ folder to Azure Static Web Apps
   ```

## 📊 Monitoring and Analytics

The application includes:

- **Application Insights**: Page views, performance, errors
- **Health Checks**: `/api/health` endpoint monitored by Azure
- **Log Analytics**: Centralized logging with 30-day retention
- **Custom Telemetry**: Role names and custom events

View analytics in the Azure Portal under Application Insights.

## 🧪 API Endpoints

- `GET /api/home` - Homepage data
- `GET /api/about` - About page data
- `GET /api/resume` - Resume data
- `GET /api/projects` - List all projects
- `GET /api/projects/{id}` - Get project by ID
- `GET /api/health` - Health check endpoint

## 🎨 Customization

### Update Content

Edit the controller files in `backend/Portfolio.Api/Controllers/` to update:
- Homepage content (`HomeController.cs`)
- About information (`AboutController.cs`)
- Resume details (`ResumeController.cs`)
- Projects list (`ProjectsController.cs`)

### Styling

All CSS files are in the `frontend/src` directory:
- Global styles: `index.css`
- Layout: `components/Layout.css`
- Page-specific: `pages/*.css`

## 📦 Building for Production

### Backend

```bash
cd backend/Portfolio.Api
dotnet publish -c Release -o ./publish
```

### Frontend

```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### CORS Issues
- Ensure backend CORS configuration includes your frontend URL
- Check `CORS_ALLOWED_ORIGINS` environment variable in Azure

### API Not Responding
- Verify backend is running on the correct port
- Check `VITE_API_URL` in frontend `.env` file
- Review browser console for errors

### Build Errors
- Ensure you have the correct .NET SDK version (8.0)
- Run `dotnet restore` in the backend directory
- Run `npm install` in the frontend directory

## 📚 Additional Resources

- [.NET Core Documentation](https://docs.microsoft.com/dotnet/core/)
- [React Documentation](https://react.dev/)
- [Azure App Service Documentation](https://docs.microsoft.com/azure/app-service/)
- [Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)

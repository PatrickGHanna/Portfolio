# Quick Start Guide

Get your portfolio website up and running in minutes!

## Prerequisites Check

Make sure you have installed:
- ✅ .NET 8.0 SDK
- ✅ Node.js 18+
- ✅ Git

## Step 1: Clone and Navigate

```bash
cd PersonalProjects
```

## Step 2: Start the Backend

Open a terminal and run:

```bash
cd backend/Portfolio.Api
dotnet restore
dotnet run
```

Wait for the message: `Now listening on: https://localhost:5001`

## Step 3: Start the Frontend

Open a **new terminal** and run:

```bash
cd frontend
npm install
npm run dev
```

Wait for the message: `Local: http://localhost:3000`

## Step 4: Open in Browser

Navigate to: **http://localhost:3000**

You should see your portfolio website!

## What's Next?

### Customize Content

1. **Homepage**: Edit `backend/Portfolio.Api/Controllers/HomeController.cs`
2. **About**: Edit `backend/Portfolio.Api/Controllers/AboutController.cs`
3. **Resume**: Edit `backend/Portfolio.Api/Controllers/ResumeController.cs`
4. **Projects**: Edit `backend/Portfolio.Api/Controllers/ProjectsController.cs`

### Test API Directly

Visit: **https://localhost:5001/swagger** to see all API endpoints and test them.

### Deploy to Azure

See [infrastructure/README.md](./infrastructure/README.md) for deployment instructions.

## Troubleshooting

### Port Already in Use

If port 5000/5001 is in use:
- Backend: Edit `Properties/launchSettings.json`
- Frontend: Edit `vite.config.js` and change the port

### CORS Errors

Make sure:
- Backend is running on port 5000/5001
- Frontend is running on port 3000
- Both are running simultaneously

### Module Not Found

Run:
```bash
cd frontend
npm install
```

### .NET Build Errors

Run:
```bash
cd backend/Portfolio.Api
dotnet restore
dotnet clean
dotnet build
```

## Development Tips

- **Hot Reload**: Both frontend and backend support hot reload
- **API Changes**: Restart the backend after changing controllers
- **Frontend Changes**: Vite automatically reloads on file changes
- **Swagger**: Use Swagger UI to test API endpoints without the frontend

## Need Help?

Check the main [README.md](./README.md) for detailed documentation.

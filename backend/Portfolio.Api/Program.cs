using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.ApplicationInsights.Channel;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register application services
builder.Services.AddScoped<Portfolio.Api.Services.IResumeService, Portfolio.Api.Services.ResumeService>();

// Configure CORS for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        var corsOrigins = builder.Configuration["CORS_ALLOWED_ORIGINS"];
        string[] allowedOrigins;
        
        if (string.IsNullOrWhiteSpace(corsOrigins) || corsOrigins == "*")
        {
            // Default to localhost for development, or allow all if explicitly set to "*"
            allowedOrigins = builder.Environment.IsDevelopment()
                ? new[] { "http://localhost:3000", "https://localhost:3000" }
                : new[] { "*" };
        }
        else
        {
            allowedOrigins = corsOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        }
        
        if (allowedOrigins.Length == 1 && allowedOrigins[0] == "*")
        {
            // Wildcard: Allow all origins, but cannot use AllowCredentials
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
        else
        {
            // Specific origins: Can use AllowCredentials
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        }
    });
});

// Add Application Insights (only if connection string is provided)
var appInsightsConnectionString = builder.Configuration["APPLICATIONINSIGHTS_CONNECTION_STRING"];
if (!string.IsNullOrWhiteSpace(appInsightsConnectionString))
{
    builder.Services.AddApplicationInsightsTelemetry(options =>
    {
        options.ConnectionString = appInsightsConnectionString;
    });
    builder.Services.AddSingleton<ITelemetryInitializer, CustomTelemetryInitializer>();
}

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Only use HTTPS redirection in development
// Azure App Service handles HTTPS termination at the load balancer
if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowReactApp");

// Enable static files middleware to serve files from wwwroot
app.UseStaticFiles();

app.UseAuthorization();
app.MapControllers();

app.Run();

// Custom telemetry initializer for better tracking
public class CustomTelemetryInitializer : ITelemetryInitializer
{
    public void Initialize(ITelemetry telemetry)
    {
        telemetry.Context.Cloud.RoleName = "Portfolio-API";
    }
}

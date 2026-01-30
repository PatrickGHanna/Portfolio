using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public class ResumeService : IResumeService
{
    private readonly IWebHostEnvironment _environment;
    private readonly ILogger<ResumeService> _logger;
    private readonly JsonSerializerOptions _jsonOptions;

    public ResumeService(
        IWebHostEnvironment environment,
        ILogger<ResumeService> logger)
    {
        _environment = environment;
        _logger = logger;
        _jsonOptions = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
    }

    public async Task<Resume?> LoadResumeAsync()
    {
        try
        {
            var filePath = Path.Combine(_environment.ContentRootPath, "Data", "resume.json");
            
            if (!System.IO.File.Exists(filePath))
            {
                _logger.LogError("Resume data file not found at {FilePath}", filePath);
                return null;
            }

            var jsonContent = await System.IO.File.ReadAllTextAsync(filePath);
            var resume = JsonSerializer.Deserialize<Resume>(jsonContent, _jsonOptions);

            if (resume == null)
            {
                _logger.LogError("Failed to deserialize resume data");
                return null;
            }

            return resume;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error loading resume data");
            return null;
        }
    }
}

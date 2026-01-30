using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Models;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController : ControllerBase
{
    private readonly ILogger<ResumeController> _logger;
    private readonly IWebHostEnvironment _environment;

    public ResumeController(ILogger<ResumeController> logger, IWebHostEnvironment environment)
    {
        _logger = logger;
        _environment = environment;
    }

    [HttpGet]
    public IActionResult Get()
    {
        _logger.LogInformation("Resume data requested");
        
        try
        {
            var filePath = Path.Combine(_environment.ContentRootPath, "Data", "resume.json");
            
            if (!System.IO.File.Exists(filePath))
            {
                _logger.LogError("Resume data file not found at {FilePath}", filePath);
                return StatusCode(500, "Resume data file not found");
            }

            var jsonContent = System.IO.File.ReadAllText(filePath);
            var resume = JsonSerializer.Deserialize<Resume>(jsonContent, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            if (resume == null)
            {
                _logger.LogError("Failed to deserialize resume data");
                return StatusCode(500, "Failed to load resume data");
            }

            return Ok(resume);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error loading resume data");
            return StatusCode(500, "An error occurred while loading resume data");
        }
    }
}

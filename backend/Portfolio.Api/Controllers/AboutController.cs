using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AboutController : ControllerBase
{
    private readonly ILogger<AboutController> _logger;

    public AboutController(ILogger<AboutController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        _logger.LogInformation("About page data requested");
        
        var response = new
        {
            name = "Your Name",
            title = "Full Stack Developer",
            bio = "I'm a passionate developer with expertise in .NET Core, React, and cloud technologies. I love building scalable applications and solving complex problems.",
            skills = new[]
            {
                ".NET Core / C#",
                "React.js",
                "Node.js",
                "Azure Cloud",
                "Terraform",
                "SQL Server"
            },
            location = "Your Location",
            email = "your.email@example.com",
            linkedIn = "https://linkedin.com/in/yourprofile",
            github = "https://github.com/yourusername"
        };

        return Ok(response);
    }
}

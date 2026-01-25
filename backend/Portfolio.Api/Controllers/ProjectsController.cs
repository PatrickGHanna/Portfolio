using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ILogger<ProjectsController> _logger;

    public ProjectsController(ILogger<ProjectsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        _logger.LogInformation("Projects data requested");
        
        var response = new[]
        {
            new
            {
                id = 1,
                title = "E-Commerce Platform",
                description = "Full-stack e-commerce solution built with .NET Core and React",
                technologies = new[] { ".NET Core", "React", "SQL Server", "Azure" },
                imageUrl = "/images/project1.jpg",
                githubUrl = "https://github.com/yourusername/project1",
                liveUrl = "https://project1.example.com"
            },
            new
            {
                id = 2,
                title = "Task Management App",
                description = "Collaborative task management application with real-time updates",
                technologies = new[] { "Node.js", "React", "WebSockets", "MongoDB" },
                imageUrl = "/images/project2.jpg",
                githubUrl = "https://github.com/yourusername/project2",
                liveUrl = "https://project2.example.com"
            },
            new
            {
                id = 3,
                title = "Portfolio Website",
                description = "Responsive portfolio website with modern UI/UX",
                technologies = new[] { "React", ".NET Core", "Azure", "Terraform" },
                imageUrl = "/images/project3.jpg",
                githubUrl = "https://github.com/yourusername/portfolio",
                liveUrl = "https://yourportfolio.com"
            }
        };

        return Ok(response);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        _logger.LogInformation("Project {ProjectId} data requested", id);
        
        // In a real scenario, this would fetch from a database
        var project = new
        {
            id = id,
            title = "Sample Project",
            description = "Detailed project description",
            technologies = new[] { "Technology 1", "Technology 2" },
            imageUrl = "/images/project.jpg",
            githubUrl = "https://github.com/yourusername/project",
            liveUrl = "https://project.example.com",
            details = "More detailed information about the project..."
        };

        return Ok(project);
    }
}

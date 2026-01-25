using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        _logger.LogInformation("Homepage data requested");
        
        var response = new
        {
            title = "Welcome to My Portfolio",
            subtitle = "Full Stack Developer",
            description = "Building modern web applications with passion and precision.",
            heroImage = "/images/hero.jpg"
        };

        return Ok(response);
    }
}

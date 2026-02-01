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
            subtitle = "This site was generated using Cursor AI",
            description = "This site is meant to be a showcase of my work and understanding of Cursor and the technologies I have used. Feel free to look at the code on Github. Is this an overcomplication of a modern portfolio website? Absolutely, but I wanted a reason to learn Cursor and see how it handled the technologies I am familiar with.",
            heroImage = "/images/profile.jpg"
        };

        return Ok(response);
    }
}

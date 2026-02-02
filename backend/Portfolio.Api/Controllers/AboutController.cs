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
            name = "Patrick Hanna",
            title = "Software Engineering Manager | Servant Leader",
            bio = "Let's get a little more personal than you will see on my LinkedIn. My real passions are helping people, enjoying others company, and learning. For me, these are all very social endeavours. I want to see the people close to me happy, successful, and always growing. I get a lot of satisfaction when I can be a positive part of someones journey, whether as a coach, a friend, or a teammate. I love music festivals, rock climbing, snowboarding, and dungeons and dragons.",
            imageUrl = "/images/profile.jpg",
            skills = new[]
            {
                "Engineering Management",
                "Servant Leadership",
                "Coaching & Mentoring",
                "Stakeholder Management",
                "Project Management",
                "Technical Leadership"
            },
            location = "Salt Lake City, UT",
            email = "Patrick.Gene.Hanna@gmail.com",
            linkedIn = "https://www.linkedin.com/in/patrickgenehanna",
            github = "https://github.com/patrickghanna"
        };

        return Ok(response);
    }
}

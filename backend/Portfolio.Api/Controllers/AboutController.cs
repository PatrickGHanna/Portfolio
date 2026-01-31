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
            bio = "As an Engineering Manager with over a decade of experience, I thrive at the intersection of people, process, and technology. I’ve led cross-functional teams in delivering high-impact software solutions in regulated, high-stakes industries—from healthcare marketplaces to education platforms—where reliability, scalability, and user experience are paramount.",
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
            linkedIn = "https://linkedin.com/in/patrickghanna",
            github = "https://github.com/patrickghanna"
        };

        return Ok(response);
    }
}

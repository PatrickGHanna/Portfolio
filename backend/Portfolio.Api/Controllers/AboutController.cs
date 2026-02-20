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
            github = "https://github.com/patrickghanna",
            sections = new[]
            {
                new { title = "Travel", imageUrl = "/images/travel.png", content = "Travel is a huge passion for me. I love to explore new places, cultures, and experiences. Pictured here in front of Mount Everest from the Nepal side." },
                new { title = "Music", imageUrl = "/images/music.jpg", content = "Concerts and festivals are a huge part of my life. I love to dance and get lost in the music. Pictured is a winter music festival I visited in France at the beginning of 2025 with my partner!" },
                new { title = "Climbing", imageUrl = "/images/climbing.jpg", content = "Rock climbing has been one of my favorite ways to stay fit, and has been a connecting factor to some of my closest friends." },
                new { title = "D&D", imageUrl = "/images/dnd.jpg", content = "At my core I am a huge nerd. I grew up watching the fantasy genre, with Lord of the Rings being one of my favorite movies. This passion has carried over into my adulthood, and I now enjoy playing Dungeons and Dragons with my friends, playing two times a week with seperate groups." }
            }
        };

        return Ok(response);
    }
}

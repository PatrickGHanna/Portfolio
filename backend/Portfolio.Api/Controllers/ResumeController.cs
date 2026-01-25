using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController : ControllerBase
{
    private readonly ILogger<ResumeController> _logger;

    public ResumeController(ILogger<ResumeController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public IActionResult Get()
    {
        _logger.LogInformation("Resume data requested");
        
        var response = new
        {
            summary = "Experienced full stack developer with expertise in modern web technologies and cloud platforms.",
            experience = new[]
            {
                new
                {
                    company = "Company Name",
                    position = "Senior Developer",
                    startDate = "2020-01",
                    endDate = "Present",
                    description = "Led development of scalable web applications using .NET Core and React."
                }
            },
            education = new[]
            {
                new
                {
                    institution = "University Name",
                    degree = "Bachelor of Science in Computer Science",
                    graduationDate = "2019"
                }
            },
            certifications = new[]
            {
                "Microsoft Certified: Azure Developer Associate",
                "AWS Certified Solutions Architect"
            }
        };

        return Ok(response);
    }
}

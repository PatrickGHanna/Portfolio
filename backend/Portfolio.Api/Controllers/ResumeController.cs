using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.Models;
using Portfolio.Api.Services;

namespace Portfolio.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController : ControllerBase
{
    private readonly ILogger<ResumeController> _logger;
    private readonly IResumeService _resumeService;

    public ResumeController(ILogger<ResumeController> logger, IResumeService resumeService)
    {
        _logger = logger;
        _resumeService = resumeService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        _logger.LogInformation("Resume data requested");
        
        var resume = await _resumeService.LoadResumeAsync();

        if (resume == null)
        {
            return StatusCode(500, "An error occurred while loading resume data");
        }

        return Ok(resume);
    }
}

namespace Portfolio.Api.Models;

public class Resume
{
    public ContactInfo Contact { get; set; } = new();
    public string Summary { get; set; } = string.Empty;
    public CoreCompetency[] CoreCompetencies { get; set; } = Array.Empty<CoreCompetency>();
    public TechnicalSkills TechnicalSkills { get; set; } = new();
    public Experience[] Experience { get; set; } = Array.Empty<Experience>();
    public Education[] Education { get; set; } = Array.Empty<Education>();
    public string[] Certifications { get; set; } = Array.Empty<string>();
}

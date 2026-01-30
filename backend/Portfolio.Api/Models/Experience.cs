namespace Portfolio.Api.Models;

public class Experience
{
    public string Company { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string StartDate { get; set; } = string.Empty;
    public string EndDate { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public Achievement[] Achievements { get; set; } = Array.Empty<Achievement>();
}

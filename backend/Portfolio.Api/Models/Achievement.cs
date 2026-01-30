namespace Portfolio.Api.Models;

public class Achievement
{
    public string Text { get; set; } = string.Empty;
    public string[] SubAchievements { get; set; } = Array.Empty<string>();
}

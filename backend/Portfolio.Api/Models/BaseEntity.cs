namespace Portfolio.Api.Models;

/// <summary>
/// Base entity class for future database integration
/// </summary>
public abstract class BaseEntity
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

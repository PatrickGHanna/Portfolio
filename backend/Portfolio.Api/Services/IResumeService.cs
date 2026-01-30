using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

public interface IResumeService
{
    Task<Resume?> LoadResumeAsync();
}

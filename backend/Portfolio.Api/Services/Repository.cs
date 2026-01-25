using System.Linq.Expressions;
using Portfolio.Api.Models;

namespace Portfolio.Api.Services;

/// <summary>
/// Generic repository implementation for future database integration
/// This is a placeholder that can be replaced with Entity Framework or another ORM
/// </summary>
public class Repository<T> : IRepository<T> where T : BaseEntity
{
    // In-memory storage for now - replace with database context later
    private readonly List<T> _entities = new();

    public Task<T?> GetByIdAsync(int id)
    {
        var entity = _entities.FirstOrDefault(e => e.Id == id);
        return Task.FromResult(entity);
    }

    public Task<IEnumerable<T>> GetAllAsync()
    {
        return Task.FromResult(_entities.AsEnumerable());
    }

    public Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        var func = predicate.Compile();
        var results = _entities.Where(func);
        return Task.FromResult(results);
    }

    public Task<T> AddAsync(T entity)
    {
        entity.Id = _entities.Count > 0 ? _entities.Max(e => e.Id) + 1 : 1;
        entity.CreatedAt = DateTime.UtcNow;
        _entities.Add(entity);
        return Task.FromResult(entity);
    }

    public Task UpdateAsync(T entity)
    {
        var existing = _entities.FirstOrDefault(e => e.Id == entity.Id);
        if (existing != null)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            var index = _entities.IndexOf(existing);
            _entities[index] = entity;
        }
        return Task.CompletedTask;
    }

    public Task DeleteAsync(int id)
    {
        var entity = _entities.FirstOrDefault(e => e.Id == id);
        if (entity != null)
        {
            _entities.Remove(entity);
        }
        return Task.CompletedTask;
    }
}

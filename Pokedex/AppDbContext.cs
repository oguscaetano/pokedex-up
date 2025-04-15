using Microsoft.EntityFrameworkCore;

namespace Pokedex
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Pokemon> pokemons => Set<Pokemon>();
    }
}
using Microsoft.EntityFrameworkCore;
using Pokedex;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=pokemons.db"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseHttpsRedirection();

app.MapGet("/pokemons", () => {
    return "Deu certo!!!! UHUULLL!!";
});

app.Run();
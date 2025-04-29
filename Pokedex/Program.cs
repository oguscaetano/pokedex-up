using Microsoft.EntityFrameworkCore;
using Pokedex;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=pokemons.db"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors((options) => 
{
    options.AddDefaultPolicy((policy) => 
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

app.UseHttpsRedirection();

app.MapGet("/pokemons", (AppDbContext db) => 
{
    var listaPokemons = db.pokemons.ToList();
    return Results.Ok(listaPokemons);
});

app.MapGet("/pokemons/{id}", async (int id, AppDbContext db) => 
{
    var pokemon = await db.pokemons.FindAsync(id);
    return pokemon is not null ? Results.Ok(pokemon) : Results.NotFound("Pokemon não encontrado!");
});

app.MapPost("/pokemons", async (AppDbContext db, Pokemon pokemon) => 
{
    db.pokemons.Add(pokemon);
    await db.SaveChangesAsync();
    return Results.Created($"pokemons/{pokemon.Id}", pokemon);
});

app.MapPut("/pokemons/{id}", async (int id, AppDbContext db, Pokemon updatedPokemon) => 
{
    var pokemonAtual = await db.pokemons.FindAsync(id);

    if (pokemonAtual == null)
    {
        return Results.NotFound("Pokemon não encontrado!");
    }

    pokemonAtual.Nome = updatedPokemon.Nome;
    pokemonAtual.Peso = updatedPokemon.Peso;

    await db.SaveChangesAsync();

    return Results.Ok(pokemonAtual);
});

app.MapDelete("/pokemons/{id}", async (int id, AppDbContext db) => 
{
    var pokemon = await db.pokemons.FindAsync(id);

    if (pokemon == null)
    {
        return Results.NotFound("Pokemon não encontrado!");
    }

    db.pokemons.Remove(pokemon);
    await db.SaveChangesAsync();

    return Results.Ok("Pokemon mandado para a glória!");
});

app.Run();
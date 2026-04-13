using Microsoft.EntityFrameworkCore;
using RestauranteApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=restaurante.db"));

var app = builder.Build();

//GET
app.MapGet("/cardapio", async (AppDbContext db) =>
{
    return await db.Lanches.ToListAsync();
});

//GET by id
app.MapGet("/cardapio/{id}", async (int id, AppDbContext db) =>
{
    var lanche = await db.Lanches.FindAsync(id);
    return lanche != null ? Results.Ok(lanche) : Results.NotFound();
});

//POST
app.MapPost("/cardapio", async (Cardapio lanche, AppDbContext db) =>
{
    db.Lanches.Add(lanche);
    await db.SaveChangesAsync();
    return Results.Created($"O lanche {lanche.Nome} foi adicionado com sucesso!", lanche);
});


app.Run();
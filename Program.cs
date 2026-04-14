using Microsoft.EntityFrameworkCore;
using RestauranteApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=restaurante.db"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

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

//PUT
app.MapPut("/cardapio/{id}", async (int id, Cardapio lancheAtualizado, AppDbContext db) =>
{
    var lanche = await db.Lanches.FindAsync(id);
    if (lanche == null)
    {
        return Results.NotFound("Lanche não encontrado.");
    }

    lanche.Nome = lancheAtualizado.Nome;
    lanche.Preco = lancheAtualizado.Preco;

    await db.SaveChangesAsync();
    return Results.Ok(lanche);
});

//DELETE
app.MapDelete("/cardapio/{id}", async (int id, AppDbContext db) =>
{
    var lanche = await db.Lanches.FindAsync(id);
    if (lanche == null)
    {
        return Results.NotFound("Lanche não encontrado.");
    }

    db.Lanches.Remove(lanche);
    await db.SaveChangesAsync();
    return Results.NoContent();
});


app.Run();
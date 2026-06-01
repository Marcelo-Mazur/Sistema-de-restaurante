using RestauranteApi.Enums;
using RestauranteApi.Models;

namespace RestauranteApi.Data;

public static class DatabaseSeeder
{
    public static void Seed(AppDbContext db)
    {
        if (db.Lanches.Any())
        {
            return;
        }

        db.Lanches.AddRange(
            new Cardapio { Nome = "Hamburguer Artesanal", Preco = 28.00m, Categoria = CategoriaCardapio.Lanche },
            new Cardapio { Nome = "Cheeseburguer", Preco = 22.00m, Categoria = CategoriaCardapio.Lanche },
            new Cardapio { Nome = "X-Calabresa", Preco = 24.00m, Categoria = CategoriaCardapio.Lanche },
            new Cardapio { Nome = "Sanduiche Natural de Atum", Preco = 20.00m, Categoria = CategoriaCardapio.Lanche },
            new Cardapio { Nome = "Prato Executivo de Frango", Preco = 34.00m, Categoria = CategoriaCardapio.Prato },
            new Cardapio { Nome = "Parmegiana da Casa", Preco = 42.00m, Categoria = CategoriaCardapio.Prato },
            new Cardapio { Nome = "Batata Frita", Preco = 18.00m, Categoria = CategoriaCardapio.Acompanhamento },
            new Cardapio { Nome = "Aneis de Cebola", Preco = 16.00m, Categoria = CategoriaCardapio.Acompanhamento },
            new Cardapio { Nome = "Refrigerante Lata", Preco = 7.00m, Categoria = CategoriaCardapio.Bebida },
            new Cardapio { Nome = "Suco Natural", Preco = 10.00m, Categoria = CategoriaCardapio.Bebida },
            new Cardapio { Nome = "Brownie com Sorvete", Preco = 18.00m, Categoria = CategoriaCardapio.Sobremesa },
            new Cardapio { Nome = "Pudim da Casa", Preco = 12.00m, Categoria = CategoriaCardapio.Sobremesa }
        );

        db.SaveChanges();
    }
}

using RestauranteApi.Enums;

namespace RestauranteApi.Models
{
    public class Cardapio
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public decimal Preco { get; set; }
        public CategoriaCardapio Categoria { get; set; }
    }
}
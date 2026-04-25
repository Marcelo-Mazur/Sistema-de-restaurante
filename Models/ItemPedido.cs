using System.ComponentModel.DataAnnotations;

namespace RestauranteApi.Models
{
    public class ItemPedido
    {
        [Key]
        public int Id { get; set; }

        public int PedidoId { get; set; }
        public Pedido? Pedido { get; set; }

        public int CardapioId { get; set; }
        public Cardapio? Cardapio { get; set; }

        public int Quantidade { get; set; }

        public decimal PrecoUnitario { get; set; }
    }
}

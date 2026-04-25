using RestauranteApi.Enums;
using System.ComponentModel.DataAnnotations;

namespace RestauranteApi.Models
{
    public class Pedido
    {
        [Key]
        public int Id { get; set; }

        public int UsuarioId { get; set; }
        public Usuarios? Usuario { get; set; }

        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;

        public StatusPedido Status { get; set; } = StatusPedido.Aberto;

        public List<ItemPedido> Itens { get; set; } = new();

        public Pagamento? Pagamento { get; set; }
    }
}

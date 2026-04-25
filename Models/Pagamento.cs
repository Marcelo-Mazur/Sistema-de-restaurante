using RestauranteApi.Enums;
using System.ComponentModel.DataAnnotations;

namespace RestauranteApi.Models
{
    public class Pagamento
    {
        [Key]
        public int Id { get; set; }

        public int PedidoId { get; set; }
        public Pedido? Pedido { get; set; }

        public FormaPagamento Forma { get; set; }

        public StatusPagamento Status { get; set; } = StatusPagamento.Pendente;

        public decimal ValorPago { get; set; }

        public DateTime? DataPagamento { get; set; }
    }
}

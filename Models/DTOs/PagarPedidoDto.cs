using RestauranteApi.Enums;

namespace RestauranteApi.Models.DTOs
{
    public class PagarPedidoDto
    {
        public int PedidoId { get; set; }
        public FormaPagamento Forma { get; set; }
    }
}

namespace RestauranteApi.Models.DTOs
{
    public class CriarPedidoDto
    {
        public int UsuarioId { get; set; }
        public List<AdicionarItemDto> Itens { get; set; } = new();
    }
}

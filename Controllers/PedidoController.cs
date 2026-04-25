using Microsoft.AspNetCore.Mvc;
using RestauranteApi.Enums;
using RestauranteApi.Models;
using RestauranteApi.Models.DTOs;
using RestauranteApi.Repositories;

namespace RestauranteApi.Controllers
{
    [ApiController]
    [Route("api/pedidos")]
    public class PedidoController : ControllerBase
    {
        private readonly IPedidoRepository _pedidoRepo;
        private readonly ICardapioRepository _cardapioRepo;

        public PedidoController(IPedidoRepository pedidoRepo, ICardapioRepository cardapioRepo)
        {
            _pedidoRepo = pedidoRepo;
            _cardapioRepo = cardapioRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_pedidoRepo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var pedido = _pedidoRepo.GetById(id);

            if (pedido == null)
                return NotFound("Pedido não encontrado");

            return Ok(pedido);
        }

        [HttpGet("usuario/{usuarioId}")]
        public IActionResult GetByUsuario(int usuarioId)
        {
            return Ok(_pedidoRepo.GetByUsuario(usuarioId));
        }

        [HttpPost]
        public IActionResult Post(CriarPedidoDto dto)
        {
            var pedido = new Pedido
            {
                UsuarioId = dto.UsuarioId,
                DataCriacao = DateTime.UtcNow,
                Status = StatusPedido.Aberto
            };

            foreach (var itemDto in dto.Itens)
            {
                var lanche = _cardapioRepo.GetById(itemDto.CardapioId);

                if (lanche == null)
                    return NotFound($"Item do cardápio com id {itemDto.CardapioId} não encontrado");

                pedido.Itens.Add(new ItemPedido
                {
                    CardapioId = itemDto.CardapioId,
                    Quantidade = itemDto.Quantidade,
                    PrecoUnitario = lanche.Preco
                });
            }

            _pedidoRepo.Add(pedido);
            return Ok(pedido);
        }

        [HttpPut("{id}/status")]
        public IActionResult AtualizarStatus(int id, [FromBody] StatusPedido novoStatus)
        {
            var pedido = _pedidoRepo.GetById(id);

            if (pedido == null)
                return NotFound("Pedido não encontrado");

            pedido.Status = novoStatus;
            _pedidoRepo.Update(pedido);

            return Ok("Status atualizado com sucesso");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var pedido = _pedidoRepo.GetById(id);

            if (pedido == null)
                return NotFound("Pedido não encontrado");

            _pedidoRepo.Delete(id);
            return Ok("Pedido removido com sucesso");
        }
    }
}

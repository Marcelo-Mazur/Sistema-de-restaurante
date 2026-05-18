using Microsoft.AspNetCore.Mvc;
using RestauranteApi.Enums;
using RestauranteApi.Models;
using RestauranteApi.Models.DTOs;
using RestauranteApi.Repositories;

namespace RestauranteApi.Controllers
{
    [ApiController]
    [Route("api/pagamentos")]
    public class PagamentoController : ControllerBase
    {
        private readonly IPagamentoRepository _pagamentoRepo;
        private readonly IPedidoRepository _pedidoRepo;

        public PagamentoController(IPagamentoRepository pagamentoRepo, IPedidoRepository pedidoRepo)
        {
            _pagamentoRepo = pagamentoRepo;
            _pedidoRepo = pedidoRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_pagamentoRepo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var pagamento = _pagamentoRepo.GetById(id);

            if (pagamento == null)
                return NotFound("Pagamento não encontrado");

            return Ok(pagamento);
        }

        [HttpGet("pedido/{pedidoId}")]
        public IActionResult GetByPedido(int pedidoId)
        {
            var pagamento = _pagamentoRepo.GetByPedido(pedidoId);

            if (pagamento == null)
                return NotFound("Nenhum pagamento encontrado para este pedido");

            return Ok(pagamento);
        }

        [HttpPost]
        public IActionResult Pagar(PagarPedidoDto dto)
        {
            var pedido = _pedidoRepo.GetById(dto.PedidoId);

            if (pedido == null)
                return NotFound("Pedido não encontrado");

            var pagamentoExistente = _pagamentoRepo.GetByPedido(dto.PedidoId);
            if (pagamentoExistente != null && pagamentoExistente.Status == StatusPagamento.Pago)
                return BadRequest("Este pedido já foi pago");

            var total = pedido.Itens.Sum(i => i.PrecoUnitario * i.Quantidade);

            var pagamento = new Pagamento
            {
                PedidoId = dto.PedidoId,
                Forma = dto.Forma,
                Status = StatusPagamento.Pago,
                ValorPago = total,
                DataPagamento = DateTime.UtcNow
            };

            _pagamentoRepo.Add(pagamento);

            pedido.Status = StatusPedido.EmPreparo;
            _pedidoRepo.Update(pedido);

            return Ok(pagamento);
        }

        [HttpPut("{id}/cancelar")]
        public IActionResult Cancelar(int id)
        {
            var pagamento = _pagamentoRepo.GetById(id);

            if (pagamento == null)
                return NotFound("Pagamento não encontrado");

            if (pagamento.Status == StatusPagamento.Cancelado)
                return BadRequest("Pagamento já está cancelado");

            pagamento.Status = StatusPagamento.Cancelado;
            _pagamentoRepo.Update(pagamento);

            return Ok("Pagamento cancelado com sucesso");
        }
    }
}

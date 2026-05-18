using Microsoft.EntityFrameworkCore;
using RestauranteApi.Models;

namespace RestauranteApi.Repositories
{
    public class PagamentoRepository : IPagamentoRepository
    {
        private readonly AppDbContext _context;

        public PagamentoRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Pagamento> GetAll()
        {
            return _context.Pagamentos
                .Include(p => p.Pedido)
                .ToList();
        }

        public Pagamento? GetById(int id)
        {
            return _context.Pagamentos
                .Include(p => p.Pedido)
                .FirstOrDefault(p => p.Id == id);
        }

        public Pagamento? GetByPedido(int pedidoId)
        {
            return _context.Pagamentos
                .Include(p => p.Pedido)
                .FirstOrDefault(p => p.PedidoId == pedidoId);
        }

        public void Add(Pagamento pagamento)
        {
            _context.Pagamentos.Add(pagamento);
            _context.SaveChanges();
        }

        public void Update(Pagamento pagamento)
        {
            var existente = _context.Pagamentos.Find(pagamento.Id);

            if (existente == null)
                return;

            existente.Status = pagamento.Status;
            existente.DataPagamento = pagamento.DataPagamento;

            _context.SaveChanges();
        }
    }
}

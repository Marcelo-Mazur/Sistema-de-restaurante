using Microsoft.EntityFrameworkCore;
using RestauranteApi.Models;

namespace RestauranteApi.Repositories
{
    public class PedidoRepository : IPedidoRepository
    {
        private readonly AppDbContext _context;

        public PedidoRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Pedido> GetAll()
        {
            return _context.Pedidos
                .Include(p => p.Usuario)
                .Include(p => p.Itens)
                    .ThenInclude(i => i.Cardapio)
                .Include(p => p.Pagamento)
                .ToList();
        }

        public Pedido? GetById(int id)
        {
            return _context.Pedidos
                .Include(p => p.Usuario)
                .Include(p => p.Itens)
                    .ThenInclude(i => i.Cardapio)
                .Include(p => p.Pagamento)
                .FirstOrDefault(p => p.Id == id);
        }

        public List<Pedido> GetByUsuario(int usuarioId)
        {
            return _context.Pedidos
                .Include(p => p.Itens)
                    .ThenInclude(i => i.Cardapio)
                .Include(p => p.Pagamento)
                .Where(p => p.UsuarioId == usuarioId)
                .ToList();
        }

        public void Add(Pedido pedido)
        {
            _context.Pedidos.Add(pedido);
            _context.SaveChanges();
        }

        public void Update(Pedido pedido)
        {
            var existente = _context.Pedidos.Find(pedido.Id);

            if (existente == null)
                return;

            existente.Status = pedido.Status;

            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var pedido = _context.Pedidos.Find(id);

            if (pedido != null)
            {
                _context.Pedidos.Remove(pedido);
                _context.SaveChanges();
            }
        }
    }
}

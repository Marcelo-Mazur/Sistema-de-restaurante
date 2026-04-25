using RestauranteApi.Models;

namespace RestauranteApi.Repositories
{
    public interface IPedidoRepository
    {
        List<Pedido> GetAll();
        Pedido? GetById(int id);
        List<Pedido> GetByUsuario(int usuarioId);
        Pedido? GetCarrinhoByUsuario(int usuarioId);
        void Add(Pedido pedido);
        void Update(Pedido pedido);
        void Delete(int id);
        void RemoverItem(int itemPedidoId);
    }
}

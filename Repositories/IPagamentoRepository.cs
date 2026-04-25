using RestauranteApi.Models;

namespace RestauranteApi.Repositories
{
    public interface IPagamentoRepository
    {
        List<Pagamento> GetAll();
        Pagamento? GetById(int id);
        Pagamento? GetByPedido(int pedidoId);
        void Add(Pagamento pagamento);
        void Update(Pagamento pagamento);
    }
}

using RestauranteApi;

namespace RestauranteApi.Repositories
{
    public interface ICardapioRepository
    {
        List<Cardapio> GetAll();
        Cardapio? GetById(int id);
        void Add(Cardapio cardapio);
        void Update(Cardapio cardapio);
        void Delete(int id);
    }
}
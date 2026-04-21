using RestauranteApi.Models;

namespace RestauranteApi.Repositories
{
    public interface ICategoriaRepository
    {
        List<Categoria> GetAll();
        Categoria? GetById(int id);
        void Add(Categoria categoria);
        void Update(Categoria categoria);
        void Delete(int id);
    }
}

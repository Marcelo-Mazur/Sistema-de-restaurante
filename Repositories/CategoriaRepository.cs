using RestauranteApi.Models;

namespace RestauranteApi.Repositories
{
    public class CategoriaRepository : ICategoriaRepository
    {
        private readonly AppDbContext _context;

        public CategoriaRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Categoria> GetAll()
        {
            return _context.Categorias.ToList();
        }

        public Categoria? GetById(int id)
        {
            return _context.Categorias.Find(id);
        }

        public void Add(Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            _context.SaveChanges();
        }

        public void Update(Categoria categoria)
        {
            var existente = _context.Categorias.Find(categoria.Id);

            if (existente == null)
                return;

            existente.Nome = categoria.Nome;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var categoria = _context.Categorias.Find(id);

            if (categoria != null)
            {
                _context.Categorias.Remove(categoria);
                _context.SaveChanges();
            }
        }
    }
}

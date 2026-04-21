using RestauranteApi.Models;
using RestauranteApi;
using Microsoft.EntityFrameworkCore;

namespace RestauranteApi.Repositories
{
    public class CardapioRepository : ICardapioRepository
    {
        private readonly AppDbContext _context;

        public CardapioRepository(AppDbContext context)
        {
            _context = context;
        }

        public List<Cardapio> GetAll()
        {
            return _context.Lanches.Include(c => c.Categoria).ToList();
        }

        public Cardapio? GetById(int id)
        {
            return _context.Lanches.Include(c => c.Categoria).FirstOrDefault(c => c.Id == id);
        }

        public void Add(Cardapio cardapio)
        {
            _context.Lanches.Add(cardapio);
            _context.SaveChanges();
        }

        public void Update(Cardapio cardapio)
        {
            var existente = _context.Lanches.Find(cardapio.Id);

            if (existente == null)
                return;

            existente.Nome = cardapio.Nome;
            existente.Preco = cardapio.Preco;
            existente.CategoriaId = cardapio.CategoriaId;

            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var cardapio = _context.Lanches.Find(id);

            if (cardapio != null)
            {
                _context.Lanches.Remove(cardapio);
                _context.SaveChanges();
            }
        }
    }
}
using RestauranteApi.Models;

namespace RestauranteApi.Repositories;

public class TokenRepository : ITokenRepository
{
    private readonly AppDbContext _context;

    public TokenRepository(AppDbContext context)
    {
        _context = context;
    }

    public void Salvar(TokenSessao sessao)
    {
        _context.Tokens.Add(sessao);
        _context.SaveChanges();
    }
}
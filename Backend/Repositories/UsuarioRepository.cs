using RestauranteApi.Models;

namespace RestauranteApi.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly AppDbContext _context;

    // Construtor: requisito obrigatório demonstrado aqui
    public UsuarioRepository(AppDbContext context)
    {
        _context = context;
    }

    public void Cadastrar(Usuarios usuario)
    {
        _context.Usuarios.Add(usuario);
        _context.SaveChanges();
    }

    public Usuarios? ObterPorEmail(string email)
    {
        return _context.Usuarios.FirstOrDefault(u => u.Email == email);
    }

    public bool EmailExiste(string email)
    {
        return _context.Usuarios.Any(u => u.Email == email);
    }
}
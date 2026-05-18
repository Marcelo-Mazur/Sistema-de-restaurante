using RestauranteApi.Models;

namespace RestauranteApi.Repositories;

public interface IUsuarioRepository
{
    void Cadastrar(Usuarios usuario);
    Usuarios? ObterPorEmail(string email);
    bool EmailExiste(string email);
}
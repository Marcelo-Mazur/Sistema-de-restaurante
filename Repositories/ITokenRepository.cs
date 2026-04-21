using RestauranteApi.Models;

namespace RestauranteApi.Repositories;

public interface ITokenRepository
{
    void Salvar(TokenSessao sessao);
}
using Microsoft.AspNetCore.Mvc;
using RestauranteApi.Models;
using RestauranteApi.Models.DTOs;
using RestauranteApi.Repositories;
using BCrypt.Net;

namespace RestauranteApi.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUsuarioRepository _repository;
    private readonly ITokenRepository _tokenRepository; // 1. DECLARAR

    // 2. ADICIONAR NO CONSTRUTOR
    public AuthController(IUsuarioRepository repository, ITokenRepository tokenRepository)
    {
        _repository = repository;
        _tokenRepository = tokenRepository; 
    }

    [HttpPost("cadastro")]
    public IActionResult Cadastro([FromBody] CadastroDto dto)
    {
        // 1. Validação de tamanho de senha (Requisito: min 6 caracteres)
        if (dto.Senha.Length < 6)
        {
            return BadRequest(new { mensagem = "A senha deve ter pelo menos 6 caracteres." });
        }

        // 2. Verificar se o e-mail já está cadastrado
        if (_repository.EmailExiste(dto.Email))
        {
            return BadRequest(new { mensagem = "Este e-mail já está em uso." });
        }

        // 3. Criar o objeto de Usuário e fazer o Hash da Senha
        var novoUsuario = new Usuarios
        {
            Nome = dto.Nome,
            Email = dto.Email,
            // O BCrypt gera o salt e o hash automaticamente
            SenhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha),
            Tipo = Enums.TipoUsuario.USER // Padrão
        };

        // 4. Salvar no Banco via Repository
        _repository.Cadastrar(novoUsuario);

        // Gerando o Token manual
        var tokenGerado = Guid.NewGuid().ToString(); 

        var sessao = new TokenSessao
        {
            Token = tokenGerado,
            UsuarioId = novoUsuario.Id
        };

        // Aqui você salvaria no banco (precisará de um método no Repository para Tokens)
        _tokenRepository.Salvar(sessao);

        return Ok(new { 
            mensagem = "Usuário cadastrado com sucesso!",
            usuario = novoUsuario.Nome,
            token = tokenGerado 
        });
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto dto)
    {
        // 1. Buscar usuário pelo e-mail
        var usuario = _repository.ObterPorEmail(dto.Email);

        // 2. Validar se usuário existe e se a senha bate (usando BCrypt)
        if (usuario == null || !BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.SenhaHash))
        {
            return Unauthorized(new { mensagem = "E-mail ou senha inválidos." });
        }

        // 3. Gerar novo token
        var tokenGerado = Guid.NewGuid().ToString();

        var sessao = new TokenSessao
        {
            Token = tokenGerado,
            UsuarioId = usuario.Id
        };

        // 4. Salvar o token no banco
        _tokenRepository.Salvar(sessao);

        return Ok(new { 
            mensagem = "Login realizado com sucesso!",
            usuario = usuario.Nome,
            token = tokenGerado 
        });
    }

    // // Método temporário só para não dar erro enquanto não configuramos o JWT real
    // private string GerarTokenFake(Usuarios usuario)
    // {
    //     return "token_provisorio_ate_configurarmos_o_jwt";
    // }
}
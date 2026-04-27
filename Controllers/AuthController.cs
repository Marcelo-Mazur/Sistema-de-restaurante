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
    private readonly ITokenRepository _tokenRepository;

    public AuthController(IUsuarioRepository repository, ITokenRepository tokenRepository)
    {
        _repository = repository;
        _tokenRepository = tokenRepository; 
    }

    [HttpPost("cadastro")]
    public IActionResult Cadastro([FromBody] CadastroDto dto)
    {
        if (dto.Senha.Length < 6)
        {
            return BadRequest(new { mensagem = "A senha deve ter pelo menos 6 caracteres." });
        }

        if (_repository.EmailExiste(dto.Email))
        {
            return BadRequest(new { mensagem = "Este e-mail já está em uso." });
        }

        var novoUsuario = new Usuarios
        {
            Nome = dto.Nome,
            Email = dto.Email,
            SenhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha),
            Tipo = Enums.TipoUsuario.USER
        };

        _repository.Cadastrar(novoUsuario);

        var tokenGerado = Guid.NewGuid().ToString(); 

        var sessao = new TokenSessao
        {
            Token = tokenGerado,
            UsuarioId = novoUsuario.Id
        };

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
        var usuario = _repository.ObterPorEmail(dto.Email);

        if (usuario == null || !BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.SenhaHash))
        {
            return Unauthorized(new { mensagem = "E-mail ou senha inválidos." });
        }

        var tokenGerado = Guid.NewGuid().ToString();

        var sessao = new TokenSessao
        {
            Token = tokenGerado,
            UsuarioId = usuario.Id
        };

        _tokenRepository.Salvar(sessao);

        return Ok(new { 
            mensagem = "Login realizado com sucesso!",
            usuario = usuario.Nome,
            token = tokenGerado 
        });
    }
}
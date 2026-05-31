using Microsoft.AspNetCore.Mvc;
using RestauranteApi.Models;
using RestauranteApi.Models.DTOs;
using RestauranteApi.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using BCrypt.Net;

namespace RestauranteApi.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUsuarioRepository _repository;
    private readonly ITokenRepository _tokenRepository;

    private readonly IConfiguration _configuration;

    public AuthController(IUsuarioRepository repository, ITokenRepository tokenRepository, IConfiguration configuration)
    {
        _repository = repository;
        _tokenRepository = tokenRepository;
        _configuration = configuration;
    }
    private string GerarTokenJwt(Usuarios usuario)
    {
        // Puxa a chave secreta que criamos
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        // Embute as informações do usuário dentro do token
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, usuario.Nome),
            new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
            new Claim("id", usuario.Id.ToString()),
            new Claim(ClaimTypes.Role, usuario.Tipo.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(8), // Duração que estava no seu TokenSessao
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
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

        var tokenGerado = GerarTokenJwt(novoUsuario); 

        var sessao = new TokenSessao
        {
            Token = tokenGerado,
            UsuarioId = novoUsuario.Id
        };

        _tokenRepository.Salvar(sessao);

        return Ok(new { 
            mensagem = "Usuário cadastrado com sucesso!",
            usuarioId = novoUsuario.Id,
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

        var tokenGerado = GerarTokenJwt(usuario);

        var sessao = new TokenSessao
        {
            Token = tokenGerado,
            UsuarioId = usuario.Id
        };

        _tokenRepository.Salvar(sessao);

        return Ok(new { 
            mensagem = "Login realizado com sucesso!",
            usuarioId = usuario.Id,
            usuario = usuario.Nome,
            token = tokenGerado 
        });
    }

    [HttpPost("logout")]
    public IActionResult Logout([FromBody] LogoutDto dto)
    {
        if (string.IsNullOrEmpty(dto.Token))
        {
            return BadRequest(new { mensagem = "O token é obrigatório." });
        }

        _tokenRepository.Excluir(dto.Token);

        return NoContent();
    }
    }
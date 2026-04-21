using RestauranteApi.Enums;
using System.ComponentModel.DataAnnotations;

namespace RestauranteApi.Models
{
    public class Usuarios
    {
        [Key]
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string SenhaHash { get; set; } = string.Empty;
        
        // Pode ser 'ADMIN' ou 'USER'
        public TipoUsuario Tipo { get; set; } = TipoUsuario.USER; 
    }
}
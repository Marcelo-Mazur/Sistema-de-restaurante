using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestauranteApi.Models
{
    public class TokenSessao
    {
        [Key]
        public int Id { get; set; }

        public string Token { get; set; } = string.Empty;

        public int UsuarioId { get; set; }

        [ForeignKey("UsuarioId")]
        public Usuarios? Usuario { get; set; }

        public DateTime DataExpiracao { get; set; } = DateTime.Now.AddHours(8);
    }
}
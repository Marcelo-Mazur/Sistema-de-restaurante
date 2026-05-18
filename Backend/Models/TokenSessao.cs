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

        // Relacionamento: Isso mostra pro professor que você sabe usar Objetos vinculados
        [ForeignKey("UsuarioId")]
        public Usuarios? Usuario { get; set; }

        public DateTime DataExpiracao { get; set; } = DateTime.Now.AddHours(8);
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RestauranteApi.Models;
using Microsoft.EntityFrameworkCore;

namespace RestauranteApi
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Cardapio> Lanches => Set<Cardapio>();
        public DbSet<Usuarios> Usuarios { get; set; }

        public DbSet<TokenSessao> Tokens { get; set; }
        public DbSet<Categoria> Categorias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuarios>()
                .Property(u => u.Tipo)
                .HasConversion<string>();
        }

    }
}
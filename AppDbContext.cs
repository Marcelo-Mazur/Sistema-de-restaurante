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
    }
}
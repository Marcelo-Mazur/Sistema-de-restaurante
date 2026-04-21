using Microsoft.AspNetCore.Mvc;
using RestauranteApi.Repositories;
using RestauranteApi.Models;

namespace RestauranteApi.Controllers
{
    [ApiController]
    [Route("api/categoria")]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaRepository _repo;

        public CategoriaController(ICategoriaRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var categoria = _repo.GetById(id);

            if (categoria == null)
                return NotFound("Categoria não encontrada");

            return Ok(categoria);
        }

        [HttpPost]
        public IActionResult Post(Categoria categoria)
        {
            _repo.Add(categoria);
            return Ok(categoria);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Categoria categoria)
        {
            var existente = _repo.GetById(id);

            if (existente == null)
                return NotFound("Categoria não encontrada");

            categoria.Id = id;
            _repo.Update(categoria);

            return Ok("Atualizada com sucesso");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existente = _repo.GetById(id);

            if (existente == null)
                return NotFound("Categoria não encontrada");

            _repo.Delete(id);
            return Ok("Removida com sucesso");
        }
    }
}

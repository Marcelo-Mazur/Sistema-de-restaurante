using Microsoft.AspNetCore.Mvc;
using RestauranteApi.Repositories;

namespace RestauranteApi.Controllers
{
    [ApiController]
    [Route("api/cardapio")]
    public class CardapioController : ControllerBase
    {
        private readonly ICardapioRepository _repo;

        public CardapioController(ICardapioRepository repo)
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
            var cardapio = _repo.GetById(id);

            if (cardapio == null)
                return NotFound("Lanche não encontrado");

            return Ok(cardapio);
        }

        [HttpPost]
        public IActionResult Post(Cardapio cardapio)
        {
            _repo.Add(cardapio);
            return Ok(cardapio);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Cardapio cardapio)
        {
            var existente = _repo.GetById(id);

            if (existente == null)
                return NotFound("Lanche não encontrado");

            cardapio.Id = id;
            _repo.Update(cardapio);

            return Ok("Atualizado com sucesso");
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existente = _repo.GetById(id);

            if (existente == null)
                return NotFound("Lanche não encontrado");

            _repo.Delete(id);
            return Ok("Removido com sucesso");
        }
    }
}
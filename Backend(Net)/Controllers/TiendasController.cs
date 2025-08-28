using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tienda.Api.DTOS;
using Tienda.Data;
using Tienda.Entities;
using TiendaEntity = Tienda.Entities.Tienda;

namespace Tienda.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TiendasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TiendasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/tiendas - Listar todas las tiendas
        [HttpGet]
        public IActionResult Get()
        {
            var tiendas = _context.Tiendas.ToList();
            return Ok(tiendas);
        }

        // GET: api/tiendas/{id} - Obtener tienda por id
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var tienda = _context.Tiendas.Find(id);
            if (tienda == null) return NotFound();
            return Ok(tienda);
        }

        // POST: api/tiendas - Crear tienda
        [HttpPost]
        public IActionResult Post([FromBody] TiendaCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var tienda = new TiendaEntity
            {
                Sucursal = dto.Sucursal,
                Direccion = dto.Direccion
            };

            _context.Tiendas.Add(tienda);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = tienda.IdTienda }, tienda);
        }

        // PUT: api/tiendas/{id} - Actualizar tienda
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] TiendaUpdateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var tienda = _context.Tiendas.Find(id);
            if (tienda == null) return NotFound();

            tienda.Sucursal = dto.Sucursal;
            tienda.Direccion = dto.Direccion;

            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/tiendas/{id} - Eliminar tienda
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var tienda = _context.Tiendas.Find(id);
            if (tienda == null) return NotFound();

            _context.Tiendas.Remove(tienda);
            _context.SaveChanges();

            return NoContent();
        }
    }
}

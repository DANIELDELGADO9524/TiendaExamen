using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Tienda.Api.DTOS;
using Tienda.Data;
using Tienda.Entities;

namespace Tienda.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticuloTiendaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ArticuloTiendaController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ArticuloTienda
        [HttpGet]
        public IActionResult Get()
        {
            var articulosTiendas = _context.ArticuloTienda
                .Include(at => at.Articulo)
                .Include(at => at.Tienda)
                .OrderByDescending(ca => ca.Fecha)
                .ToList();

            return Ok(articulosTiendas);
        }

        // POST: api/ArticuloTienda
        [HttpPost]
        public IActionResult Post([FromBody] ArticuloTiendaCreateDto articuloTiendaDto)
        {
            if (!_context.Articulos.Any(a => a.IdArticulo == articuloTiendaDto.IdArticulo))
                return NotFound($"Artículo con Id {articuloTiendaDto.IdArticulo} no encontrado");

            if (!_context.Tiendas.Any(t => t.IdTienda == articuloTiendaDto.IdTienda))
                return NotFound($"Tienda con Id {articuloTiendaDto.IdTienda} no encontrada");

            var articuloTienda = new ArticuloTienda
            {
                IdArticulo = articuloTiendaDto.IdArticulo,
                IdTienda = articuloTiendaDto.IdTienda,
                Fecha = System.DateTime.Now 
            };

            _context.ArticuloTienda.Add(articuloTienda);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Get), new { idArticulo = articuloTienda.IdArticulo, idTienda = articuloTienda.IdTienda }, articuloTienda);
        }

        // DELETE: api/ArticuloTienda/{idArticulo}/{idTienda}
        [HttpDelete("{idArticulo:int}/{idTienda:int}")]
        public async Task<IActionResult> Delete(int idArticulo, int idTienda)
        {
            var articuloTienda = await _context.ArticuloTienda.FindAsync(idArticulo, idTienda);

            if (articuloTienda == null)
            {
                return NotFound(new { message = "Registro no encontrado" });
            }

            _context.ArticuloTienda.Remove(articuloTienda);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Registro eliminado correctamente" });
        }
    }
}


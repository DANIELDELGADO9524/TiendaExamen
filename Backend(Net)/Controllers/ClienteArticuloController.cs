using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Tienda.Api.DTOS;
using Tienda.Data;
using Tienda.Entities;

namespace Tienda.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteArticuloController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClienteArticuloController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ClienteArticulo
        [HttpGet]
        public IActionResult Get()
        {
            var compras = _context.ClienteArticulo
                .Include(ca => ca.Cliente)
                .Include(ca => ca.Articulo)
                .OrderByDescending(ca => ca.Fecha)
                .ToList();

            return Ok(compras);
        }

        // POST: api/ClienteArticulo
        [HttpPost]
        [HttpPost]
        public IActionResult Post([FromBody] ClienteArticuloCreateDto compraDto)
        {
            if (!_context.Clientes.Any(c => c.IdCliente == compraDto.IdCliente))
                return NotFound($"Cliente con Id {compraDto.IdCliente} no encontrado");

            if (!_context.Articulos.Any(a => a.IdArticulo == compraDto.IdArticulo))
                return NotFound($"Artículo con Id {compraDto.IdArticulo} no encontrado");

            var compra = new ClienteArticulo
            {
                IdCliente = compraDto.IdCliente,
                IdArticulo = compraDto.IdArticulo,
                Fecha = DateTime.Now // 👈 Aquí asignas la fecha automáticamente
            };

            _context.ClienteArticulo.Add(compra);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Get), new { idCliente = compra.IdCliente, idArticulo = compra.IdArticulo, fecha = compra.Fecha }, compra);
        }


        // DELETE: api/ClienteArticulo/{idCliente}/{idArticulo}/{fecha}
        [HttpDelete("{idCliente:int}/{idArticulo:int}/{fecha}")]
        public async Task<IActionResult> Delete(int idCliente, int idArticulo, string fecha)
        {
            if (!DateTime.TryParse(fecha, out DateTime fechaParsed))
            {
                return BadRequest("Fecha inválida");
            }

            var compra = await _context.ClienteArticulo.FindAsync(idCliente, idArticulo, fechaParsed);

            if (compra == null)
            {
                return NotFound("Registro no encontrado");
            }

            _context.ClienteArticulo.Remove(compra);
            await _context.SaveChangesAsync();

            return Ok("Registro eliminado correctamente");
        }
    }
}

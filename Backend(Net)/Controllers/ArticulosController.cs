using Microsoft.AspNetCore.Mvc;
using Tienda.Data;
using Tienda.Entities;
using Microsoft.EntityFrameworkCore;
using Tienda.Api.DTOS;

namespace Tienda.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticulosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ArticulosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: Listar todos los artículos
        [HttpGet]
        public IActionResult Get()
        {
            var articulos = _context.Articulos
                .Include(a => a.Tiendas) // Relación con ArticuloTienda
                .ThenInclude(at => at.Tienda)
                .ToList();
            return Ok(articulos);
        }

        // GET por ID
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var articulo = _context.Articulos
                .Include(a => a.Tiendas)
                .ThenInclude(at => at.Tienda)
                .FirstOrDefault(a => a.IdArticulo == id);

            if (articulo == null) return NotFound();
            return Ok(articulo);
        }

        // POST: Crear artículo
        [HttpPost]
        public IActionResult Post([FromBody] ArticuloCreateDto dto)
        {
            var articulo = new Articulo
            {
                Codigo = dto.Codigo,
                Descripcion = dto.Descripcion,
                Precio = dto.Precio,
                Imagen = dto.Imagen,
                Stock = dto.Stock,
                Tiendas = new List<ArticuloTienda>()
            };

            _context.Articulos.Add(articulo);
            _context.SaveChanges();
            return Ok(articulo);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ArticuloUpdateDto dto)
        {
            var existing = _context.Articulos.Find(id);
            if (existing == null) return NotFound();

            existing.Codigo = dto.Codigo;
            existing.Descripcion = dto.Descripcion;
            existing.Precio = dto.Precio;
            existing.Imagen = dto.Imagen;
            existing.Stock = dto.Stock;

            _context.SaveChanges();
            return Ok(existing);
        }


        // DELETE: Eliminar artículo
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existing = _context.Articulos.Find(id);
            if (existing == null) return NotFound();

            _context.Articulos.Remove(existing);
            _context.SaveChanges();
            return Ok("Artículo eliminado");
        }

        // POST: Asignar artículo a tienda
        [HttpPost("{idArticulo}/asignar-tienda/{idTienda}")]
        public IActionResult AsignarTienda(int idArticulo, int idTienda)
        {
            var articulo = _context.Articulos.Find(idArticulo);
            var tienda = _context.Tiendas.Find(idTienda);
            if (articulo == null || tienda == null)
                return NotFound("Artículo o tienda no encontrado");

            var relacion = new ArticuloTienda
            {
                IdArticulo = idArticulo,
                IdTienda = idTienda,
                Fecha = DateTime.Now
            };

            _context.ArticuloTienda.Add(relacion);
            _context.SaveChanges();

            return Ok("Artículo asignado a tienda");
        }
    }
}

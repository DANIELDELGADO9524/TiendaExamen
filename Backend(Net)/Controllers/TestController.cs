using Microsoft.AspNetCore.Mvc;
using Tienda.Data;

namespace Tienda.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TestController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            // Trae todos los clientes de la base de datos
            var clientes = _context.Clientes.ToList();
            return Ok(clientes);
        }
    }
}

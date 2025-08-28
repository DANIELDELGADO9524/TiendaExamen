using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tienda.API.DTOs;
using Tienda.Business;
using Tienda.Data;
using Tienda.Entities;

namespace Tienda.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientesController : ControllerBase
    {
        private readonly IClienteService _clienteService;

        public ClientesController(IClienteService clienteService)
        {
            _clienteService = clienteService;
        }
       
        // GET: api/clientes
        [HttpGet]
        public IActionResult Get()
        {
            var clientes = _clienteService.ObtenerTodos();
            return Ok(clientes);
        }

        // GET: api/clientes/1
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var cliente = _clienteService.ObtenerPorId(id);
            if (cliente == null) return NotFound();
            return Ok(cliente);
        }

        // POST: api/clientes
        [HttpPost]
        public IActionResult Post([FromBody] ClienteCreateDto dto)
        {
            var cliente = new Cliente
            {
                Nombre = dto.Nombre,
                Apellidos = dto.Apellidos,
                Direccion = dto.Direccion,
                Password = dto.Password
            };

            _clienteService.CrearCliente(cliente);
            return Ok(cliente);
        }
        // PUT: api/clientes/1
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ClienteCreateDto dto)
        {
            var existing = _clienteService.ObtenerPorId(id);
            if (existing == null) return NotFound();

            existing.Nombre = dto.Nombre;
            existing.Apellidos = dto.Apellidos;
            existing.Direccion = dto.Direccion;

            _clienteService.ActualizarCliente(existing);
            return Ok(existing);
        }

        // DELETE: api/clientes/1
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existing = _clienteService.ObtenerPorId(id);
            if (existing == null) return NotFound();

            _clienteService.EliminarCliente(id);
            return Ok($"Cliente {id} eliminado");
        }


        [HttpPost("login")]
        public IActionResult Login([FromBody] ClienteLoginDto dto)
        {
            var cliente = _clienteService.Login(dto.Nombre, dto.Password);

            if (cliente == null)
                return Unauthorized("Usuario o contraseña incorrectos");

            return Ok(new
            {
                cliente.IdCliente,
                cliente.Nombre,
                cliente.Apellidos
            });
        }
    }
}

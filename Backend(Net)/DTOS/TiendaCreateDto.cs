using System.ComponentModel.DataAnnotations;

namespace Tienda.Api.DTOS
{
    public class TiendaCreateDto
    {
        [Required]
        public string Sucursal { get; set; }

        [Required]
        public string Direccion { get; set; }
    }

    public class TiendaUpdateDto
    {
        public string Sucursal { get; set; }
        public string Direccion { get; set; }
    }
}

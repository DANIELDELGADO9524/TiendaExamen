using System.ComponentModel.DataAnnotations;

namespace Tienda.Api.DTOS
{
    public class ArticuloCreateDto
    {
        [Required]
        public string Codigo { get; set; }

        [Required]
        public string Descripcion { get; set; }

        [Required]
        public decimal Precio { get; set; }

        public string Imagen { get; set; }

        [Required]
        public int Stock { get; set; }
    }

    public class ArticuloUpdateDto
    {
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public string Imagen { get; set; }
        public int Stock { get; set; }
    }
}

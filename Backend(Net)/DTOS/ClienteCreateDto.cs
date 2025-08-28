namespace Tienda.API.DTOs
{
    public class ClienteCreateDto
    {
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Direccion { get; set; }

        public string Password { get; set; }
    }
}
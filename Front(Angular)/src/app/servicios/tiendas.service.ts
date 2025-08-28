import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Tienda {
  idTienda: number;
  sucursal: string;
  direccion: string;
}
export interface TiendaCreateDto {
  sucursal: string;
  direccion: string;
}

@Injectable({
  providedIn: 'root'
})
export class TiendasService {
  private apiUrl = 'https://localhost:7029/api/Tiendas';

  constructor(private http: HttpClient) {}

  obtenerTiendas(): Observable<Tienda[]> {
    return this.http.get<Tienda[]>(this.apiUrl);
  }

crearTienda(tienda: TiendaCreateDto): Observable<Tienda> {
  return this.http.post<Tienda>(this.apiUrl, tienda);
}

  actualizarTienda(tienda: Tienda): Observable<any> {
    return this.http.put(`${this.apiUrl}/${tienda.idTienda}`, tienda);
  }

  eliminarTienda(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

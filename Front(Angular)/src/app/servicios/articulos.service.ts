import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Articulo {
 idArticulo: number;
  codigo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
}

export interface ArticuloCreateDto {
    
  codigo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  private apiUrl = 'https://localhost:7029/api/Articulos';

  constructor(private http: HttpClient) {}

  obtenerArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  crearArticulo(articulo: ArticuloCreateDto): Observable<Articulo> {
    return this.http.post<Articulo>(this.apiUrl, articulo);
  }

  actualizarArticulo(id: number, articulo: ArticuloCreateDto): Observable<Articulo> {
    return this.http.put<Articulo>(`${this.apiUrl}/${id}`, articulo);
  }

  eliminarArticulo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  asignarArticuloATienda(idArticulo: number, idTienda: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${idArticulo}/asignar-tienda/${idTienda}`, {});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TiendaArticulo {
  idArticulo: number;
  idTienda: number;
  fecha: string; 
  articulo?: any;
  tienda?: any;
}

export interface TiendaArticuloCreate {
  idArticulo: number;
  idTienda: number;
}

@Injectable({
  providedIn: 'root'
})
export class TiendaArticuloService {
  private apiUrl = 'https://localhost:7029/api/ArticuloTienda'; // la URL de tu API

  constructor(private http: HttpClient) {}

  obtenerArticulosTiendas(): Observable<TiendaArticulo[]> {
    return this.http.get<TiendaArticulo[]>(this.apiUrl);
  }

  agregarArticuloTienda(data: TiendaArticuloCreate): Observable<TiendaArticulo> {
    return this.http.post<TiendaArticulo>(this.apiUrl, data);
  }

  eliminarArticuloTienda(idArticulo: number, idTienda: number): Observable<any> {
    const url = `${this.apiUrl}/${idArticulo}/${idTienda}`;
    return this.http.delete(url);
  }
}

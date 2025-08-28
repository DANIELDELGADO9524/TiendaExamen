import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClienteArticulo {
  idCliente: number;
  idArticulo: number;
  fecha: string; 
  cliente?: any;
  articulo?: any;
}
export interface ClienteArticuloCreate {
  idCliente: number;
  idArticulo: number;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteArticuloService {
  private apiUrl = 'https://localhost:7029/api/ClienteArticulo'; 

  constructor(private http: HttpClient) {}

  obtenerCompras(): Observable<ClienteArticulo[]> {
    return this.http.get<ClienteArticulo[]>(this.apiUrl);
  }

  agregarCompra(compra: { idCliente: number; idArticulo: number }): Observable<ClienteArticulo> {
    return this.http.post<ClienteArticulo>(this.apiUrl, compra);
  }

  eliminarCompra(idCliente: number, idArticulo: number, fecha: string): Observable<any> {
    const url = `${this.apiUrl}/${idCliente}/${idArticulo}/${fecha}`;
    return this.http.delete(url);
  }
}

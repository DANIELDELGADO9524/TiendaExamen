import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../Models/cliente.model';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'https://localhost:7029/api/Clientes';
   

  constructor(private http: HttpClient) {}

  obtenerClientes(): Observable<any> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  crearCliente(cliente: any): Observable<any> {
  return this.http.post(this.apiUrl, cliente);
}

actualizarCliente(cliente: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${cliente.idCliente}`, cliente);
}

eliminarCliente(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
}


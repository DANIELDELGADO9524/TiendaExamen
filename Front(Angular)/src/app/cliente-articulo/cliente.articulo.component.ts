import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ClientesService } from '../servicios/clientes.services';
import { Cliente } from '../Models/cliente.model';
import { ArticulosService, Articulo } from '../servicios/articulos.service';
import { ClienteArticuloService, ClienteArticulo, ClienteArticuloCreate } from '../servicios/cliente-articulo.service';

@Component({
  selector: 'app-cliente-articulo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule
  ],
  templateUrl: './cliente-articulo.html',
  styleUrls: ['./cliente-articulo.css']
})
export class ClienteArticuloComponent implements OnInit {
  compras: ClienteArticulo[] = [];

  clientes: Cliente[] = [];
  articulos: Articulo[] = [];

nuevaCompra: ClienteArticuloCreate = {
  idCliente: 0,
  idArticulo: 0
};

  constructor(
    private compraService: ClienteArticuloService,
    private clienteService: ClientesService,
    private articuloService: ArticulosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarCompras();
    this.cargarClientes();
    this.cargarArticulos();
  }

  cargarCompras() {
    this.compraService.obtenerCompras().subscribe({
      next: data => this.compras = data,
      error: err => console.error(err)
    });
  }

  cargarClientes() {
    this.clienteService.obtenerClientes().subscribe({
      next: data => this.clientes = data,
      error: err => console.error(err)
    });
  }

  cargarArticulos() {
    this.articuloService.obtenerArticulos().subscribe({
      next: data => this.articulos = data,
      error: err => console.error(err)
    });
  }

 registrarCompra() {
  const { idCliente, idArticulo } = this.nuevaCompra;

  this.compraService.agregarCompra({ idCliente, idArticulo }).subscribe({
    next: () => {
      this.snackBar.open('Compra registrada', 'Cerrar', { duration: 3000 });
      this.cargarCompras();
      this.limpiar();
    },
    error: err => {
      console.error(err);
      this.snackBar.open('Error al registrar compra', 'Cerrar', { duration: 3000 });
    }
  });
}


  eliminarCompra(compra: ClienteArticulo) {
    this.compraService.eliminarCompra(compra.idCliente, compra.idArticulo, compra.fecha).subscribe({
      next: () => {
        this.snackBar.open('Compra eliminada', 'Cerrar', { duration: 3000 });
        this.cargarCompras();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Error al eliminar compra', 'Cerrar', { duration: 3000 });
      }
    });
  }

  limpiar() {
  this.nuevaCompra = {
    idCliente: 0,
    idArticulo: 0,
  };
}
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TiendasService, Tienda } from '../servicios/tiendas.service';
import { ArticulosService, Articulo } from '../servicios/articulos.service';
import { TiendaArticuloService, TiendaArticulo, TiendaArticuloCreate } from '../servicios/tienda.articulos.service';

@Component({
  selector: 'app-tienda-articulos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule, 
    MatButtonModule
  ],
  templateUrl: './tienda-articulos.html',
  styleUrls: ['./tienda-articulos.css']
})
export class TiendaArticulosComponent implements OnInit {
  relaciones: TiendaArticulo[] = [];

  tiendas: Tienda[] = [];
  articulos: Articulo[] = [];

  nuevaRelacion: TiendaArticuloCreate = {
    idArticulo: 0,
    idTienda: 0
  };

  constructor(
    private tiendaArticuloService: TiendaArticuloService,
    private tiendasService: TiendasService,
    private articulosService: ArticulosService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarRelaciones();
    this.cargarTiendas();
    this.cargarArticulos();
  }

  cargarRelaciones() {
    this.tiendaArticuloService.obtenerArticulosTiendas().subscribe({
      next: data => this.relaciones = data,
      error: err => console.error(err)
    });
  }

  cargarTiendas() {
    this.tiendasService.obtenerTiendas().subscribe({
      next: data => this.tiendas = data,
      error: err => console.error(err)
    });
  }

  cargarArticulos() {
    this.articulosService.obtenerArticulos().subscribe({
      next: data => this.articulos = data,
      error: err => console.error(err)
    });
  }

  registrarRelacion() {
    const { idArticulo, idTienda } = this.nuevaRelacion;

    this.tiendaArticuloService.agregarArticuloTienda({ idArticulo, idTienda }).subscribe({
      next: () => {
        this.snackBar.open('Relación tienda-artículo registrada', 'Cerrar', { duration: 3000 });
        this.cargarRelaciones();
        this.limpiar();
      },
      error: err => {
        console.error(err);
        this.snackBar.open('Error al registrar relación', 'Cerrar', { duration: 3000 });
      }
    });
  }

eliminarRelacion(relacion: TiendaArticulo) {
  this.tiendaArticuloService.eliminarArticuloTienda(relacion.idArticulo, relacion.idTienda).subscribe({
    next: (res) => {
      this.snackBar.open(res.message || 'Relación eliminada', 'Cerrar', { duration: 3000 });
      this.cargarRelaciones();
    },
    error: err => {
      console.error(err);
      this.snackBar.open(err.error?.message || 'Error al eliminar relación', 'Cerrar', { duration: 3000 });
    }
  });
}


  limpiar() {
    this.nuevaRelacion = {
      idArticulo: 0,
      idTienda: 0
    };
  }
}

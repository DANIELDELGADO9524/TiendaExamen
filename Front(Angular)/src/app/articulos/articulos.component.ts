import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';



import { ArticulosService, Articulo, ArticuloCreateDto } from '../servicios/articulos.service';

@Component({
  selector: 'app-articulos',
  standalone: true,
  templateUrl: './articulos.html',
  styleUrls: ['./articulos.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class ArticulosComponent implements OnInit {
  articulos: Articulo[] = [];

  nuevoArticulo: ArticuloCreateDto = {
    codigo: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    stock: 0
  };

  constructor(private articulosService: ArticulosService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.cargarArticulos();
  }

  cargarArticulos() {
    this.articulosService.obtenerArticulos().subscribe({
      next: (data) => this.articulos = data,
      error: (err) => console.error(err)
    });
  }

  agregarArticulo() {
    this.articulosService.crearArticulo(this.nuevoArticulo).subscribe({
      next: (articulo) => {
        this.articulos.push(articulo);
        this.nuevoArticulo = {
          codigo: '',
          descripcion: '',
          precio: 0,
          imagen: '',
          stock: 0
        };
        this.cargarArticulos();
        this.snackBar.open('Artículo agregado exitosamente', 'Cerrar', {
          duration: 4000,
          panelClass: ['snackbar-success']
        });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al agregar artículo', 'Cerrar', {
          duration: 4000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}

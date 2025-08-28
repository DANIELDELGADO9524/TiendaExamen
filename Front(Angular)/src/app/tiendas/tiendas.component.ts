import { Component, OnInit } from '@angular/core';
import { TiendasService, Tienda } from '../servicios/tiendas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TiendaCreateDto } from '../servicios/tiendas.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tiendas',
  standalone: true,
  templateUrl: './tiendas.html',
  styleUrls: ['./tiendas.css'],

  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})

export class TiendasComponent implements OnInit {
  tiendas: Tienda[] = [];
  
  nuevoTienda: TiendaCreateDto = {
    sucursal: '',
    direccion: ''
  };

  constructor(private tiendasService: TiendasService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.cargarTiendas();
  }

  cargarTiendas() {
    this.tiendasService.obtenerTiendas().subscribe({
      next: (data) => this.tiendas = data,
      error: (err) => console.error(err)
    });
  }

agregarTienda() {
  this.tiendasService.crearTienda(this.nuevoTienda).subscribe({
    next: (tienda) => {
      this.tiendas.push(tienda); 
      this.nuevoTienda = { sucursal: '', direccion: '' }; 
      this.cargarTiendas();

      // Muestra mensaje
      this.snackBar.open('Tienda agregada exitosamente', 'Cerrar', {
        duration: 6000,  // 
        panelClass: ['snackbar-success'] 
      });
    },
    error: (err) => {
      console.error(err);
      this.snackBar.open('Error al agregar tienda', 'Cerrar', {
        duration: 4000,
        panelClass: ['snackbar-error']
      });
    }
  });
}

}


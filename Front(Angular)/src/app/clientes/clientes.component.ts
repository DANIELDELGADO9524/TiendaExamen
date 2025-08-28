import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomSnackbarComponent } from './custom-snackbar.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientesService } from '../servicios/clientes.services';
import { EditarClienteDialogComponent } from './editar-cliente-dialog.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    EditarClienteDialogComponent
  ],
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css']
})
export class ClientesComponent {
  clientes: any[] = [];
  nuevoCliente: any = {};
  displayedColumns: string[] = ['idCliente', 'nombre', 'apellidos', 'direccion', 'acciones'];

  constructor(private clientesService: ClientesService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    
    this.cargarClientes();
    
  }

cargarClientes() {
  this.clientesService.obtenerClientes().subscribe({
    next: (data) => {
      
      this.clientes = data.map((cliente: any) => ({ ...cliente, activo: true }));

    },
    error: (err) => console.error(err)
  });
}


agregarCliente() {
  this.clientesService.crearCliente(this.nuevoCliente).subscribe({
    next: (res) => {
      this.clientes.push(res);
      this.nuevoCliente = {};
      this.cargarClientes();

      // Mostrar mensaje al usuario
        this.snackBar.dismiss();
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
        duration: 6000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        data: { message: 'Cliente agregado exitosamente' },
        panelClass: ['snackbar-success'] // opcional, para estilizar el fondo
      });
    },
    error: (err) => {
      console.error(err);
      
      this.snackBar.open('Ocurrió un error al agregar el cliente', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-error'] 
      });
    }
  });
}

abrirModalEditar(cliente: any) {
  const dialogRef = this.dialog.open(EditarClienteDialogComponent, {
    width: '400px',
    data: cliente
  });

  dialogRef.afterClosed().subscribe((clienteEditado) => {
    if (clienteEditado) {
      this.clientesService.actualizarCliente(clienteEditado).subscribe({
        next: () => {
          const index = this.clientes.findIndex(c => c.idCliente === clienteEditado.idCliente);
          if (index !== -1) {
            this.clientes[index] = clienteEditado;
            this.clientes = [...this.clientes]; 
          }
        },
        error: (err) => console.error(err)
      });
    }
  });
}


}

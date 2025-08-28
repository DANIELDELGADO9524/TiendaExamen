import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-editar-cliente-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Editar Cliente</h2>
    <form (ngSubmit)="guardar()" #form="ngForm" style="display:flex; flex-direction: column; gap: 16px;">
      <mat-form-field appearance="fill">
        <mat-label>Nombre</mat-label>
        <input matInput [(ngModel)]="cliente.nombre" name="nombre" required />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Apellidos</mat-label>
        <input matInput [(ngModel)]="cliente.apellidos" name="apellidos" required />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label>Dirección</mat-label>
        <input matInput [(ngModel)]="cliente.direccion" name="direccion" required />
      </mat-form-field>
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <button mat-button type="button" (click)="cancelar()">Cancelar</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Guardar</button>
      </div>
    </form>
  `
})
export class EditarClienteDialogComponent {
  cliente: any;

  constructor(
    public dialogRef: MatDialogRef<EditarClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cliente = { ...data }; // clonar data para no editar original hasta guardar
  }

  guardar() {
    this.dialogRef.close(this.cliente); // retorna el cliente editado
  }

  cancelar() {
    this.dialogRef.close(); // cierra sin cambios
  }
}

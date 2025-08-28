import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './login.html',
})
export class LoginComponent {
  nombre: string = '';
  password: string = '';
  error: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('https://localhost:7029/api/Clientes/login', {
      nombre: this.nombre,
      password: this.password
    }).subscribe({
      next: res => {
        alert('Login exitoso, bienvenido ' + res.nombre);
        
        this.router.navigate(['/clientes']); 
      },
      error: err => {
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }
}

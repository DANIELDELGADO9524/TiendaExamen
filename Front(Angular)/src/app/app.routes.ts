// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';        
import { LayoutComponent } from './layout/layout.component'; 
import { ClientesComponent } from './clientes/clientes.component'; 
import { TiendasComponent } from './tiendas/tiendas.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { ClienteArticuloComponent } from './cliente-articulo/cliente.articulo.component';
import { TiendaArticulosComponent } from './tienda-articulos/tienda-articulos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // primero la redirección raíz

  { path: 'login', component: LoginComponent },

  { 
    path: '', component: LayoutComponent, children: [
      { path: 'clientes', component: ClientesComponent },
      { path: 'articulos', component: ArticulosComponent },
      { path: 'tiendas', component: TiendasComponent },
      { path: 'cliente-articulo', component: ClienteArticuloComponent },
      { path: 'tienda-articulo', component: TiendaArticulosComponent },
    ]
  },

  { path: '**', redirectTo: 'login' }
];



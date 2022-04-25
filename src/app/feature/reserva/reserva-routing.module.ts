import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarReservaComponent } from './components/actualizar-reserva/actualizar-reserva.component';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';
import { ListarReservaComponent } from './components/listar-reserva/listar-reserva.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListarReservaComponent,
      },
      {
        path: 'crear',
        component: CrearReservaComponent
      },
      {
        path: 'actualizar/:id',
        component: ActualizarReservaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule { }

import { NgModule } from '@angular/core';

import { ReservaRoutingModule } from './reserva-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ListarReservaComponent } from './components/listar-reserva/listar-reserva.component';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';
import { ActualizarReservaComponent } from './components/actualizar-reserva/actualizar-reserva.component';
import { ReservaService } from './shared/service/reserva.service';
import { HabitacionService } from './shared/service/habitacion.service';
import { TipoPagoService } from './shared/service/tipo-pago.service';
import { UsuarioService } from './shared/service/usuario.service';


@NgModule({
  declarations: [
    ListarReservaComponent,
    CrearReservaComponent,
    ActualizarReservaComponent
  ],
  imports: [
    ReservaRoutingModule,
    SharedModule
  ],
  providers: [ReservaService, HabitacionService, TipoPagoService, UsuarioService]
})
export class ReservaModule { }

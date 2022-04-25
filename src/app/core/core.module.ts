import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityGuard } from './guard/security.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token-interceptor';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpService } from './services/http.service';
import { ManejadorError } from './interceptor/manejador-error';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalCargandoComponent } from './components/modal-cargando/modal-cargando.component';
import { ModalConfirmacionComponent } from './components/modal-confirmacion/modal-confirmacion.component';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';
import { ModalExitoComponent } from './components/modal-exito/modal-exito.component';
import { FechaService } from './services/fecha.service';
import { ManejadorErrorService } from './services/manejador-error.service';

@NgModule({
  declarations: [
    NavbarComponent, 
    ModalCargandoComponent, 
    ModalConfirmacionComponent, 
    ModalErrorComponent, 
    ModalExitoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    NavbarComponent,
    ModalCargandoComponent, 
    ModalConfirmacionComponent, 
    ModalErrorComponent, 
    ModalExitoComponent
  ],
  providers: [
    HttpService,
    FechaService,
    ManejadorErrorService,
    SecurityGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ManejadorError }
  ]
})
export class CoreModule { }

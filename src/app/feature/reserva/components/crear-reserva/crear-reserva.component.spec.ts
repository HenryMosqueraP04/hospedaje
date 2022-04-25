import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalConfirmacionComponent } from '@core/components/modal-confirmacion/modal-confirmacion.component';
import { HttpService } from '@core/services/http.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DtoHabitacion } from '@reserva/shared/model/habitacion';
import { Reserva } from '@reserva/shared/model/reserva';
import { DtoTipoPago } from '@reserva/shared/model/tipo-pago';
import { DtoUsuario } from '@reserva/shared/model/usuario';
import { HabitacionService } from '@reserva/shared/service/habitacion.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { TipoPagoService } from '@reserva/shared/service/tipo-pago.service';
import { UsuarioService } from '@reserva/shared/service/usuario.service';
import { of, throwError } from 'rxjs';

import { CrearReservaComponent } from './crear-reserva.component';

describe('CrearReservaComponent', () => {
  let component: CrearReservaComponent;
  let fixture: ComponentFixture<CrearReservaComponent>;

  // Servicios

  let reservaService: ReservaService;
  let habitacionService: HabitacionService;
  let tipoPagoService: TipoPagoService;
  let usuarioService: UsuarioService;
  let router: Router;
  let ngbModal:NgbModal;
  let modalRef:NgbModalRef;

  // variables
  let spyReservaGuardar: jasmine.Spy;
  let spyHabitacionConsultar: jasmine.Spy;
  let spyTipoPagoConsultar: jasmine.Spy;
  let spyUsuarioConsultar:jasmine.Spy;
  let spyRouter:jasmine.Spy;

  let reserva: Reserva;
  let habitaciones: DtoHabitacion[];
  let tipoPagos: DtoTipoPago[];
  let usuarios: DtoUsuario[];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearReservaComponent],
      imports: [HttpClientModule, RouterTestingModule, CommonModule, FormsModule, ReactiveFormsModule],
      providers: [ReservaService, HttpService, HabitacionService, TipoPagoService, 
        UsuarioService, NgbModal, ModalConfirmacionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearReservaComponent);
    component = fixture.componentInstance;

    reservaService = TestBed.inject(ReservaService);
    habitacionService = TestBed.inject(HabitacionService);
    tipoPagoService = TestBed.inject(TipoPagoService);
    usuarioService = TestBed.inject(UsuarioService);
    router = TestBed.inject(Router);
    ngbModal = TestBed.inject(NgbModal);  

    // arrange
    spyReservaGuardar = spyOn(reservaService,'guardar').and.returnValue(of(null));
    spyHabitacionConsultar = spyOn(habitacionService,'consultar').and.returnValue(of(habitaciones));
    spyTipoPagoConsultar = spyOn(tipoPagoService, 'consultar').and.returnValue(of(tipoPagos));
    spyUsuarioConsultar = spyOn(usuarioService, 'consultar').and.returnValue(of(usuarios));
    spyRouter = spyOn(router,'navigate');

    reserva = new Reserva(1,1,1,'2022-04-25 01:00:00', '2022-04-25 06:00:00');
    habitaciones = [
      {id:1,nombre:'HABITACIÓN PERSONA',estado:true, tipoHabitacionId: 1}
    ];
    tipoPagos = [
      {id:1,nombre:'EFECTIVO',estado:true, porcentajeImpuesto: 1}
    ];
    usuarios = [
      {id:1,nombreCompleto:'HENRY MOSQUERA',estado:true, numeroDocumento: '1003815494'}
    ]

    fixture.detectChanges();
  });

  it('deberia crear el componente', () => {
    //expect
    expect(component).toBeTruthy();
  });

  it('deberia listar las habitaciones', () => {
    //act
    component['consultarHabitaciones']();
    //expect
    expect(habitacionService.consultar).toHaveBeenCalled();
    expect(component.habitaciones.length).toBeGreaterThan(0);
    expect(component.habitaciones).toEqual(habitaciones);
  });

  it('deberia fallar al listar las habitaciones', async () => {
    //arrange
    const error = 'error';
    spyHabitacionConsultar.and.returnValue(throwError(error));
    //act
    habitacionService.consultar().subscribe(
      ()=>{},
      (err)=>expect(error).toEqual(err)
    );
    component['consultarHabitaciones']();
    //expect
    expect(habitacionService.consultar).toHaveBeenCalled();
  });

  it('deberia listar los tipos de pago', () => {
    //act
    component['consultarTipoPagos']();
    //expect
    expect(tipoPagoService.consultar).toHaveBeenCalled();
    expect(component.tipoPagos.length).toBeGreaterThan(0);
    expect(component.tipoPagos).toEqual(tipoPagos);
  });

  it('deberia fallar al listar los tipo de pagos', async () => {
    //arrange
    const error = 'error';
    spyTipoPagoConsultar.and.returnValue(throwError(error));
    //act
    tipoPagoService.consultar().subscribe(
      ()=>{},
      (err)=>expect(error).toEqual(err)
    );
    component['consultarTipoPagos']();
    //expect
    expect(tipoPagoService.consultar).toHaveBeenCalled();
  });

  it('deberia listar los usuarios', () => {
    //act
    component['consultarUsuarios']();
    //expect
    expect(usuarioService.consultar).toHaveBeenCalled();
    expect(component.usuarios.length).toBeGreaterThan(0);
    expect(component.usuarios).toEqual(usuarios);
  });

  it('deberia fallar al listar los usuarios', async () => {
    //arrange
    const error = 'error';
    spyUsuarioConsultar.and.returnValue(throwError(error));
    //act
    usuarioService.consultar().subscribe(
      ()=>{},
      (err)=>expect(error).toEqual(err)
    );
    component['consultarUsuarios']();
    //expect
    expect(tipoPagoService.consultar).toHaveBeenCalled();
  });

  it('deberia crear la entidad', () => {
    //arrange
    component.reservaForm.controls.usuarioId.setValue(1);
    component.reservaForm.controls.habitacionId.setValue(1);
    component.reservaForm.controls.tipoPagoId.setValue(1);
    component.reservaForm.controls.fechaInicio.setValue('2022-04-25');
    component.reservaForm.controls.horaInicio.setValue('01:00:00');
    component.reservaForm.controls.hora.setValue(5);
    //act
    const result = component['crearEntidad']();
    //expect
    expect(reserva).toEqual(result);
  });

  it('deberia guardar la reserva', async () => {    
    //arrange
    reservaService.guardar(reserva).subscribe(
      (res) => expect(res).toBeNull()
    );
    //act
    component['guardar'](reserva);
    //expect
    expect(spyRouter).toHaveBeenCalledWith(['/reserva']);
  });

  it('deberia fallar guardar la reserva', async () => {   
    //arrange
    const error = 'error';
    spyReservaGuardar.and.returnValue(throwError(error));
    reservaService.guardar(reserva).subscribe(
      () => {},
      (err) => expect(err).toEqual(error)
    );
    //act
    component['guardar'](reserva);
  });

  it('deberia hacer submit pero el formulario es invalido', () => {   
    //arrange - act
    component.onSubmitCrearReserva(new Event('submit'));
    //expect
    expect(component.reservaForm.invalid).toBeTruthy();
  });

  it('deberia hacer submit para crear la reserva aceptandola en el modal',async () => {   
    //arrange
    component.reservaForm.controls.usuarioId.setValue(1);
    component.reservaForm.controls.habitacionId.setValue(1);
    component.reservaForm.controls.tipoPagoId.setValue(1);
    component.reservaForm.controls.fechaInicio.setValue('2022-04-25');
    component.reservaForm.controls.horaInicio.setValue('01:00:00');
    component.reservaForm.controls.hora.setValue(5);
    modalRef = ngbModal.open(ModalConfirmacionComponent, { animation: true, backdrop: 'static', keyboard: false });
    const resuelve = true;
    modalRef.result = new Promise((resolve) => {resolve(resuelve)});
    spyOn(ngbModal,'open').and.returnValue(modalRef);
    //act
    component.onSubmitCrearReserva(new Event('submit'));
    modalRef.close(resuelve);
    //expect
    //expect
    await modalRef.result.then(
      (res:boolean) =>{expect(resuelve).toBe(res)}
    )
    expect(component.reservaForm.valid).toBeTruthy();
  });

  it('deberia hacer submit para crear la reserva pero la cancela en el modal',async () => {   
    //arrange
    component.reservaForm.controls.usuarioId.setValue(1);
    component.reservaForm.controls.habitacionId.setValue(1);
    component.reservaForm.controls.tipoPagoId.setValue(1);
    component.reservaForm.controls.fechaInicio.setValue('2022-04-25');
    component.reservaForm.controls.horaInicio.setValue('01:00:00');
    component.reservaForm.controls.hora.setValue(5);
    modalRef = ngbModal.open(ModalConfirmacionComponent, { animation: true, backdrop: 'static', keyboard: false });
    const resuelve = false;
    modalRef.result = new Promise((resolve) => {resolve(resuelve)});
    spyOn(ngbModal,'open').and.returnValue(modalRef);
    //act
    component.onSubmitCrearReserva(new Event('submit'));
    modalRef.close(resuelve);
    //expect
    //expect
    await modalRef.result.then(
      (res:boolean) =>{expect(resuelve).toBe(res)}
    )
    expect(component.reservaForm.valid).toBeTruthy();
  });
  
});

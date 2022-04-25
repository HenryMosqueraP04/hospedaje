import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
//import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalConfirmacionComponent } from '@core/components/modal-confirmacion/modal-confirmacion.component';
//import { ModalConfirmacionComponent } from '@core/components/modal-confirmacion/modal-confirmacion.component';
import { HttpService } from '@core/services/http.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DtoHabitacion } from '@reserva/shared/model/habitacion';
import { DtoReserva, Reserva } from '@reserva/shared/model/reserva';
//import { Reserva } from '@reserva/shared/model/reserva';
import { DtoTipoPago } from '@reserva/shared/model/tipo-pago';
import { HabitacionService } from '@reserva/shared/service/habitacion.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { TipoPagoService } from '@reserva/shared/service/tipo-pago.service';
import { of, throwError } from 'rxjs';

import { ActualizarReservaComponent } from './actualizar-reserva.component';

describe('ActualizarReservaComponent', () => {
  let component: ActualizarReservaComponent;
  let fixture: ComponentFixture<ActualizarReservaComponent>;

  // Servicios

  let reservaService: ReservaService;
  let habitacionService: HabitacionService;
  let tipoPagoService: TipoPagoService;
  let router: Router;
  let ngbModal:NgbModal;
  let modalRef:NgbModalRef;

  // variables
  let spyReservaActualizar: jasmine.Spy;
  let spyReservaObtenerPorId: jasmine.Spy;
  let spyHabitacionConsultar: jasmine.Spy;
  let spyTipoPagoConsultar: jasmine.Spy;
  let spyRouter:jasmine.Spy;

  let reserva: Reserva;
  let habitaciones: DtoHabitacion[];
  let tipoPagos: DtoTipoPago[];
  let dtoReserva : DtoReserva;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarReservaComponent],
      imports: [HttpClientModule, RouterTestingModule, CommonModule, FormsModule, ReactiveFormsModule],
      providers: [ReservaService, HttpService, HabitacionService, TipoPagoService, 
        NgbModal, ActualizarReservaComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarReservaComponent);
    component = fixture.componentInstance;

    reservaService = TestBed.inject(ReservaService);
    habitacionService = TestBed.inject(HabitacionService);
    tipoPagoService = TestBed.inject(TipoPagoService);
    router = TestBed.inject(Router);
    ngbModal = TestBed.inject(NgbModal);  

    // arrange

    habitaciones = [
      {id:1,nombre:'HABITACIÓN PERSONA',estado:true, tipoHabitacionId: 1}
    ];
    tipoPagos = [
      {id:1,nombre:'EFECTIVO',estado:true, porcentajeImpuesto: 1}
    ];
    dtoReserva = {
      id:1,estado:true,fechaFin:'2022-04-24 06:00:00', fechaInicio: '2022-04-24 06:00:00',
      habitacionId:1, nombreHabitacion: 'HABITACION PERSONAL', nombreTipoHabitacion: 'PERSONAL',
      nombreTipoPago: 'EFECTIVO', nombreUsuario: 'HENRY MOSQUERA', tipoPagoId:1,usuarioId:1,valor:16800
    };
    reserva = new Reserva(1,1,1,'2022-04-25 01:00:00', '2022-04-25 06:00:00',1);

    spyReservaActualizar = spyOn(reservaService,'actualizar').and.returnValue(of(null));
    spyHabitacionConsultar = spyOn(habitacionService,'consultar').and.returnValue(of(habitaciones));
    spyTipoPagoConsultar = spyOn(tipoPagoService, 'consultar').and.returnValue(of(tipoPagos));
    spyReservaObtenerPorId = spyOn(reservaService, 'obtenerPorId').and.returnValue(of(dtoReserva))
    spyRouter = spyOn(router,'navigate');
    

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

  it('deberia obtener la reserva por id', () => {
    //act
    const id = 1;
    component['obtenerPorId'](id);
    //expect
    expect(reservaService.obtenerPorId).toHaveBeenCalled();
    expect(component.dtoReserva).toBe(dtoReserva);
  });

  it('deberia fallar al obtener la reserva por id', async () => {
    //arrange
    const id = 1;
    const error = 'error';
    spyReservaObtenerPorId.and.returnValue(throwError(error));
    //act
    reservaService.obtenerPorId(id).subscribe(
      ()=>{},
      (err)=>expect(error).toEqual(err)
    );
    component['obtenerPorId'](id);
    //expect
    expect(reservaService.obtenerPorId).toHaveBeenCalled();
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

it('deberia al actualizar la reserva', async () => {   
    //arrange
    reservaService.actualizar(reserva).subscribe(
      (res) => expect(res).toBeNull()
    );
    //act
    component['actualizar'](reserva);
    //expect
    expect(spyRouter).toHaveBeenCalledWith(['/reserva']);
  });

  it('deberia fallar al actualizar la reserva', async () => {   
    //arrange
    const error = 'error';
    spyReservaActualizar.and.returnValue(throwError(error));
    reservaService.actualizar(reserva).subscribe(
      () => {},
      (err) => expect(err).toEqual(error)
    );
    //act
    component['actualizar'](reserva);
  });

  it('deberia hacer submit pero el formulario es invalido', () => {   
    //arrange - act
    component.onSubmitActualizar(new Event('submit'));
    //expect
    expect(component.reservaForm.invalid).toBeTruthy();
  });

  it('deberia hacer submit para actualizar la reserva aceptandola en el modal',async () => {   
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
    component.onSubmitActualizar(new Event('submit'));
    modalRef.close(resuelve);
    //expect
    //expect
    await modalRef.result.then(
      (res:boolean) =>{expect(resuelve).toBe(res)}
    )
    expect(component.reservaForm.valid).toBeTruthy();
  });

  it('deberia hacer submit para actualizar la reserva pero la cancela en el modal',async () => {   
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
    component.onSubmitActualizar(new Event('submit'));
    modalRef.close(resuelve);
    //expect
    //expect
    await modalRef.result.then(
      (res:boolean) =>{expect(resuelve).toBe(res)}
    )
    expect(component.reservaForm.valid).toBeTruthy();
  });

  
  
});

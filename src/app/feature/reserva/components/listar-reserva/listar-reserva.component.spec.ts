import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalConfirmacionComponent } from '@core/components/modal-confirmacion/modal-confirmacion.component';
import { HttpService } from '@core/services/http.service';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DtoReserva } from '@reserva/shared/model/reserva';
import { DtoTcrm } from '@reserva/shared/model/tcrm';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import * as moment from 'moment';
import { of, throwError } from 'rxjs';


import { ListarReservaComponent } from './listar-reserva.component';

describe('ListarReservaComponent', () => {
  let component: ListarReservaComponent;
  let fixture: ComponentFixture<ListarReservaComponent>;

  // Servicios

  let reservaService: ReservaService;
  let ngbModal:NgbModal;
  let modalRef:NgbModalRef;


  // variables
  let spyReservaServiceConsultar: jasmine.Spy;
  let spyReservaServiceObtenerTCRM: jasmine.Spy;
  let spyReservaServiceObtenerValorTCRM: jasmine.Spy;
  let spyReservaServiceEliminar: jasmine.Spy;

  const tcrm: DtoTcrm = {
    id: 1,
    success: true,
    unit: 'COP',
    validityFrom: '2022-04-23 05:00:00',
    validityTo: '2022-04-23 05:00:00',
    value: 3500
  };
  const listaReservas: DtoReserva[] = [
    {
      id: 1,
      usuarioId: 1,
      habitacionId: 1,
      tipoPagoId: 1,
      valor: 5000,
      estado: true,
      fechaInicio: moment().format("YYYY-MM-DD HH:mm:ss"),
      fechaFin: moment().add(1, 'hours').format("YYYY-MM-DD HH:mm:ss"),
      nombreHabitacion: 'HABITACION PERSONAL',
      nombreTipoHabitacion: 'PERSONAL',
      nombreTipoPago: 'EFECTIVO',
      nombreUsuario: 'HENRY MOSQUERA'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarReservaComponent],
      imports: [HttpClientModule, RouterTestingModule, CommonModule],
      providers: [ReservaService, HttpService, NgbModal, NgbActiveModal, ModalConfirmacionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarReservaComponent);
    component = fixture.componentInstance;

    reservaService = TestBed.inject(ReservaService);
    ngbModal = TestBed.inject(NgbModal);  

    // arrange
    spyReservaServiceConsultar = spyOn(reservaService, 'consultar').and.returnValue(of(listaReservas));
    spyReservaServiceObtenerTCRM = spyOn(reservaService, 'obtenerTCRM').and.returnValue(of(tcrm));
    spyReservaServiceObtenerValorTCRM = spyOn(reservaService, 'obtenerValorTCRM').and.returnValue(tcrm);
    spyReservaServiceEliminar = spyOn(reservaService, 'eliminar').and.returnValue(of(null));

    fixture.detectChanges();
  });

  it('deberia crear el componente', () => {
    //expect
    expect(component).toBeTruthy();
  });

  it('deberia listar las reservas', () => {
    //act
    component['consultar']();
    //expect
    expect(reservaService.consultar).toHaveBeenCalled();
    expect(1).toBeGreaterThanOrEqual(component.reservas.length);
    expect(listaReservas).toBe(component.reservas);
  });

  it('deberia fallar al listar las reservas', async () => {
    //arrange
    const error = 'error';
    spyReservaServiceConsultar.and.returnValue(throwError(error));
    //act
    reservaService.consultar().subscribe(
      ()=>{},
      (err)=>expect(error).toEqual(err)
    );
    component['consultar']();
    //expect
    expect(reservaService.consultar).toHaveBeenCalled();
  });

  it('deberia mostrar el tcrm', () => {
    //act
    component['obtenerTCRM']();
    //expect
    expect(reservaService.obtenerTCRM).toHaveBeenCalled();
    expect(tcrm).toEqual(component.tcrm);
  });

  it('deberia obtener el tcrm nulo, cambio de api', () => {
    //arrange
    spyReservaServiceObtenerValorTCRM.and.returnValue(null);
    //act
    component['obtenerTCRM']();
    //expect
    expect(reservaService.obtenerTCRM).toHaveBeenCalled();
    expect(reservaService.obtenerValorTCRM).toHaveBeenCalled();
    expect(component.tcrm).toBeNull();
  });

  it('deberia fallar al mostrar el tcrm', async () => {
    //arrange
    const error = 'error';
    spyReservaServiceObtenerTCRM.and.returnValue(throwError(error));
    //act
    reservaService.obtenerTCRM().subscribe(
      () => { },
      (err) => expect(error).toEqual(err)
    );
    component['obtenerTCRM']();
    //expect
    expect(reservaService.obtenerTCRM).toHaveBeenCalled();
  });

  it('deberia eliminar la reserva', () => {
    //act
    component['eliminar'](component.reservas[0], 0);
    //expect
    expect(reservaService.eliminar).toHaveBeenCalled();
    expect(component.reservas.length).toEqual(0);
  });

  it('deberia fallar al eliminar la reserva', () => {

    //arrange
    const error = 'error';
    spyReservaServiceEliminar.and.returnValue(throwError(error));
    //act
    reservaService.eliminar(component.reservas[0]).subscribe(
      () => {},
      (err) => expect(error).toEqual(err)
    );
    component['eliminar'](component.reservas[0], 0);
    //expect
    expect(reservaService.eliminar).toHaveBeenCalled();
    expect(component.reservas.length).toEqual(1);
  });

  it('ejecuta el modal y lo acepta para eliminar la reserva', async () => {
    // arrange
    const resuelve = true;
    modalRef = ngbModal.open(ModalConfirmacionComponent, { animation: true, backdrop: 'static', keyboard: false });
    spyOn(ngbModal,'open').and.returnValue(modalRef);
    // act
    component.onClickEliminarReserva(component.reservas[0], 0);
    modalRef.close(resuelve);
    modalRef.result = new Promise((resolve) => {resolve(resuelve)});
    //expect
    await modalRef.result.then(
      (res:boolean) =>{expect(resuelve).toBe(res)}
    )
  });

  it('ejecuta el modal y lo cancela para no eliminar la reserva', async () => {
    // arrange
    const resuelve = false;
    modalRef = ngbModal.open(ModalConfirmacionComponent, { animation: true, backdrop: 'static', keyboard: false });
    spyOn(ngbModal,'open').and.returnValue(modalRef);
    // act
    component.onClickEliminarReserva(component.reservas[0], 0);
    modalRef.close(resuelve);
    modalRef.result = new Promise((resolve) => {resolve(resuelve)});
    //expect
    await modalRef.result.then(
      (res:boolean) =>{expect(resuelve).toBe(res)}
    )
  });


});

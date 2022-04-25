import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { DtoReserva, Reserva } from '../model/reserva';
import { DtoTcrm } from '../model/tcrm';

import { ReservaService } from './reserva.service';

describe('ReservaService', () => {
  let httpMock: HttpTestingController;
  let reservaService: ReservaService;
  const urlEndPoint = `${environment.endpoint}/reservas`;

  // variables

  let tcrm: DtoTcrm;
  let listaReservas: DtoReserva[];
  let reserva: Reserva;


  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservaService, HttpService]
    });
    // servicios
    httpMock = injector.inject(HttpTestingController);
    reservaService = TestBed.inject(ReservaService);
    // variables
    tcrm = null;
    reserva = null;
    listaReservas = [];
  });

  it('deberia crear el componente', () => {
    expect(reservaService).toBeTruthy();
  });

  it('deberia listar reservas', () => {

    // arrange
    listaReservas = [
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
    // act - expect
    reservaService.consultar().subscribe(reservas => {
      expect(reservas.length).toBe(1);
      expect(reservas).toEqual(listaReservas);
    });

    const req = httpMock.expectOne(urlEndPoint);
    expect(req.request.method).toBe('GET');
    req.flush(listaReservas);

  });


  it('deberia listar reserva por id', () => {

    // arrange
    const id: number = 1;
    reserva = new Reserva(1, 1, 1, moment().format("YYYY-MM-DD HH:mm:ss"),
      moment().format("YYYY-MM-DD HH:mm:ss"), id);
    // act - expect
    reservaService.obtenerPorId(id).subscribe(res => {
      expect(res).toBe(reserva as DtoReserva);
    });

    const req = httpMock.expectOne(`${urlEndPoint}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(reserva);

  });

  it('deberia listar el tcrm', () => {

    // arrange
    tcrm = {
      id: 1,
      success: true,
      unit: 'COP',
      validityFrom: '2022-04-23 05:00:00',
      validityTo: '2022-04-23 05:00:00',
      value: 3500
    };
    // act - expect
    reservaService.obtenerTCRM().subscribe(res => {
      expect(res).toBe(tcrm);
    });

    const req = httpMock.expectOne(`${urlEndPoint}/tcrm`);
    expect(req.request.method).toBe('GET');
    req.flush(tcrm);

  });


  it('deberia crear una reserva', () => {
    //arrange
    reserva = new Reserva(1, 1, 1, moment().format("YYYY-MM-DD HH:mm:ss"),
      moment().format("YYYY-MM-DD HH:mm:ss"));
    //act - expect
    reservaService.guardar(reserva).subscribe((respuesta) => {
      expect(respuesta).toBe(1);
    });
    const req = httpMock.expectOne(urlEndPoint);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<number>({ body: 1 }));
  });

  it('deberia actualizar una reserva', () => {
    //arrange
    const id: number = 1;
    reserva = new Reserva(1, 1, 1, moment().format("YYYY-MM-DD HH:mm:ss"),
      moment().format("YYYY-MM-DD HH:mm:ss"), id);
    //act - expect
    reservaService.actualizar(reserva).subscribe((respuesta) => {
      expect(respuesta).toBe(null);
    });
    const req = httpMock.expectOne(`${urlEndPoint}/${id}`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<any>());
  });

  it('deberia eliminar una reserva', () => {
    //arrange
    const id: number = 1;
    reserva = new Reserva(1, 1, 1, moment().format("YYYY-MM-DD HH:mm:ss"),
      moment().format("YYYY-MM-DD HH:mm:ss"), id);
    //eliminar
    reservaService.eliminar(reserva).subscribe((respuesta) => {
      expect(respuesta).toBe(null);
    });
    const req = httpMock.expectOne(`${urlEndPoint}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<any>());
  });

  it('deberia obtener el valor del tcrm', () => {
    // arrange
    const response: any = {
      Body: {
        queryTCRMResponse: {
          return: {
            id: 1,
            success: true,
            unit: 'COP',
            validityFrom: '2022-04-23 05:00:00',
            validityTo: '2022-04-23 05:00:00',
            value: 3500
          }
        }
      }
    };
    tcrm = {
      id: 1,
      success: true,
      unit: 'COP',
      validityFrom: '2022-04-23 05:00:00',
      validityTo: '2022-04-23 05:00:00',
      value: 3500
    }
    // act - expect
    const dtoTcrm = reservaService.obtenerValorTCRM(response);
    expect(dtoTcrm).toEqual(tcrm);
  });

  it('deberia obtener el valor del tcrm', () => {
    // arrange
    const response: any = {};
    tcrm = {
      id: 1,
      success: true,
      unit: 'COP',
      validityFrom: '2022-04-23 05:00:00',
      validityTo: '2022-04-23 05:00:00',
      value: 3500
    }
    // act - expect
    const dtoTcrm = reservaService.obtenerValorTCRM(response);
    expect(dtoTcrm).toBeNull();
  });


});

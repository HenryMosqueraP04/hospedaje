import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { DtoTipoPago } from '../model/tipo-pago';

import { TipoPagoService } from './tipo-pago.service';

describe('TipoPagoService', () => {
  let httpMock: HttpTestingController;
  let tipoPagoService: TipoPagoService;
  const urlEndPoint = `${environment.endpoint}/tipo-pagos`;

  // variables

  let listaTipoPago: DtoTipoPago[];

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TipoPagoService, HttpService]
    });
    // servicios
    httpMock = injector.inject(HttpTestingController);
    tipoPagoService = TestBed.inject(TipoPagoService);
    // variables
    listaTipoPago = [];
  });

  it('deberia crear el componente', () => {
    expect(tipoPagoService).toBeTruthy();
  });

  it('deberia listar las habitaciones', () => {

    // arrange
    listaTipoPago = [
      {
        id: 1,
        nombre: 'EFECTIVO',
        porcentajeImpuesto: 1,
        estado: true,
      }
    ];
    // act - expect
    tipoPagoService.consultar().subscribe(res => {
      expect(res.length).toBe(1);
      expect(res).toEqual(listaTipoPago);
    });

    const req = httpMock.expectOne(urlEndPoint);
    expect(req.request.method).toBe('GET');
    req.flush(listaTipoPago);

  });
});

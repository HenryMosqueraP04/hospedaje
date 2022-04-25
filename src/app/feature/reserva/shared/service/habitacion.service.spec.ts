import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { DtoHabitacion } from '../model/habitacion';
import { HabitacionService } from './habitacion.service';


describe('HabitacionService', () => {
  let httpMock: HttpTestingController;
  let habitacionService: HabitacionService;
  const urlEndPoint = `${environment.endpoint}/habitaciones`;

  // variables

  let listaHabitaciones: DtoHabitacion[];

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HabitacionService, HttpService]
    });
    // servicios
    httpMock = injector.inject(HttpTestingController);
    habitacionService = TestBed.inject(HabitacionService);
    // variables
    listaHabitaciones = [];
  });

  it('deberia crear el componente', () => {
    expect(habitacionService).toBeTruthy();
  });

  it('deberia listar las habitaciones', () => {

    // arrange
    listaHabitaciones = [
      {
        id: 1,
        nombre: 'HABITACION PERSONAL',
        tipoHabitacionId: 1,
        estado: true,
      }
    ];
    // act - expect
    habitacionService.consultar().subscribe(res => {
      expect(res.length).toBe(1);
      expect(res).toEqual(listaHabitaciones);
    });

    const req = httpMock.expectOne(urlEndPoint);
    expect(req.request.method).toBe('GET');
    req.flush(listaHabitaciones);

  });
  
});

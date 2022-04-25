import { TestBed, waitForAsync } from "@angular/core/testing";
import * as moment from "moment";
import { FechaService } from "./fecha.service";

describe('FechaService', () => {
  let fechaService: FechaService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [FechaService]
    });
  }));

  beforeEach(() => {
    fechaService = TestBed.inject(FechaService);
  })

  it('deberia crear el servicio', () => {
    expect(fechaService).toBeTruthy();
  });

  it('deberia obtener la fecha', () => {
    const momento = moment('2022-04-24 05:00:00');
    const result = fechaService.obtenerFecha('2022-04-24', '05:00:00');
    expect(result).toEqual(momento);
  });

  it('deberia retornar undefined al formatear la fecha', () => {
    const momento = moment('2022-04-50 10:00:00');
    const result = fechaService.formatearFecha(momento);
    expect(result).toBeUndefined();
  });

  it('deberia retornar undefined al formatear la fecha', () => {
    const momento = moment('2022-04-24 10:00:00');
    const result = fechaService.formatearFecha(momento);
    expect(result).toBe(momento.format('YYYY-MM-DD HH:mm:ss'));
  });


});
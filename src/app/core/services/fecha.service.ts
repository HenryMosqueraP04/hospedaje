import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  constructor() { }

  public obtenerFecha(fecha: string, hora: string): moment.Moment {
    return moment(`${fecha} ${hora}`);
  }

  public formatearFecha(fecha: moment.Moment): string {
    return fecha.isValid() ? fecha.format('YYYY-MM-DD HH:mm:ss') : undefined;
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP_ERRORES_CODIGO } from '@core/interceptor/http-codigo-error';

@Injectable({
  providedIn: 'root'
})
export class ManejadorErrorService {

  constructor() { }

  public procesarError(error: HttpErrorResponse): string {

    if (!navigator.onLine) {
      return HTTP_ERRORES_CODIGO.NO_HAY_INTERNET;
    }

    if (!error || !(error instanceof HttpErrorResponse)) {
      return HTTP_ERRORES_CODIGO[500];
    }

    if (error.hasOwnProperty('status') && error.error && !error.error.hasOwnProperty('mensaje')) {
      return this.obtenerErrorHttpCode(error.status);
    }

    if (error.hasOwnProperty('status') && error.error && error.error.hasOwnProperty('mensaje')
    && error.error.mensaje.length > 0) {
      const err: any = error;
      return err.error.mensaje;
    }

    return HTTP_ERRORES_CODIGO[500];
  }

  private obtenerErrorHttpCode(httpCode: number): string {

    if (!HTTP_ERRORES_CODIGO.hasOwnProperty(httpCode)) {
      return HTTP_ERRORES_CODIGO.PETICION_FALLIDA;
    }

    return HTTP_ERRORES_CODIGO[httpCode];
  }

}

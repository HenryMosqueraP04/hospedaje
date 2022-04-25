import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { DtoReserva, Reserva } from '../model/reserva';
import { DtoTcrm } from '../model/tcrm';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private urlEndPoint = environment.endpoint + "/reservas";

  constructor(private http: HttpService) { }

  public consultar() {
    return this.http.doGet<DtoReserva[]>(`${this.urlEndPoint}`, this.http.optsName('consultar reservas'));
  }

  public obtenerPorId(id: number) {
    return this.http.doGet<DtoReserva>(`${this.urlEndPoint}/${id}`, this.http.optsName('consultar reserva por id'));
  }

  public obtenerTCRM() {
    return this.http.doGet<any>(`${this.urlEndPoint}/tcrm`, this.http.optsName('consultar TCRM'));
  }

  public guardar(reserva: Reserva) {
    return this.http.doPost<Reserva, number>(`${this.urlEndPoint}`, reserva,
      this.http.optsName('crear reserva'));
  }

  public actualizar(reserva: Reserva) {
    return this.http.doPut<Reserva, any>(`${this.urlEndPoint}/${reserva.id}`, reserva,
      this.http.optsName('actualizar reserva'));
  }

  public eliminar(reserva: Reserva) {
    return this.http.doDelete<any>(`${this.urlEndPoint}/${reserva.id}`,
      this.http.optsName('eliminar reserva'));
  }

  // utilidad

  public obtenerValorTCRM(response: any): DtoTcrm | null {
    if (!response || !response.Body || !response.Body.queryTCRMResponse
      || !response.Body.queryTCRMResponse.return) {
      return null;
    }

    return response.Body.queryTCRMResponse.return;
  }

}

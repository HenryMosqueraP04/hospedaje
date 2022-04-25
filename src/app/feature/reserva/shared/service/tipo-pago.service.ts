import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { DtoTipoPago } from '../model/tipo-pago';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  private urlEndPoint = environment.endpoint + "/tipo-pagos";

  constructor(private http: HttpService) { }

  public consultar() {
    return this.http.doGet<DtoTipoPago[]>(`${this.urlEndPoint}`, this.http.optsName('consultar tipo de pagos'));
  }
}

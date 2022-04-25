import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { DtoHabitacion } from '../model/habitacion';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private urlEndPoint = environment.endpoint + "/habitaciones";

  constructor(private http: HttpService) { }

  public consultar() {
    return this.http.doGet<DtoHabitacion[]>(`${this.urlEndPoint}`, this.http.optsName('consultar habitaciones'));
  }

}

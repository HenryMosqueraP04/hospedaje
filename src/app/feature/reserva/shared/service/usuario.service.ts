import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { DtoUsuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndPoint = environment.endpoint + "/usuarios";

  constructor(private http: HttpService) { }

  public consultar() {
    return this.http.doGet<DtoUsuario[]>(`${this.urlEndPoint}`, this.http.optsName('consultar usuarios'));
  }
}

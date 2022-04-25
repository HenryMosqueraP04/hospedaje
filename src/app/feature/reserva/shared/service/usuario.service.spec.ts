import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { DtoUsuario } from '../model/usuario';

import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let httpMock: HttpTestingController;
  let usuarioservice: UsuarioService;
  const urlEndPoint = `${environment.endpoint}/usuarios`;

  // variables

  let listaUsuario: DtoUsuario[];

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService, HttpService]
    });
    // servicios
    httpMock = injector.inject(HttpTestingController);
    usuarioservice = TestBed.inject(UsuarioService);
    // variables
    listaUsuario = [];
  });

  it('deberia crear el componente', () => {
    expect(usuarioservice).toBeTruthy();
  });

  it('deberia listar las habitaciones', () => {

    // arrange
    listaUsuario = [
      {
        id: 1,
        nombreCompleto: 'HENRY MOSQUERA',
        numeroDocumento: '1003815494',
        estado: true,
      }
    ];
    // act - expect
    usuarioservice.consultar().subscribe(res => {
      expect(res.length).toBe(1);
      expect(res).toEqual(listaUsuario);
    });

    const req = httpMock.expectOne(urlEndPoint);
    expect(req.request.method).toBe('GET');
    req.flush(listaUsuario);

  });
});

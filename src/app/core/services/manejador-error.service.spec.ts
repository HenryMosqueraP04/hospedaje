import { HttpErrorResponse } from "@angular/common/http";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { HTTP_ERRORES_CODIGO } from "@core/interceptor/http-codigo-error";
import { ManejadorErrorService } from "./manejador-error.service";

describe('ManejadorErrorService', () => {
    let manejadorErrorService: ManejadorErrorService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [ManejadorErrorService]
        });
    }));

    beforeEach(async () => {
        manejadorErrorService = TestBed.inject(ManejadorErrorService);

        Object.defineProperty(navigator, 'onLine', {
            value: true,
            configurable: true
        });
    })

    it('deberia crear el servicio', () => {
        expect(manejadorErrorService).toBeTruthy();
    });

    it('deberia obtener error generico', () => {
        //arrange
        const status = 0;
        const error = HTTP_ERRORES_CODIGO.PETICION_FALLIDA;
        //act
        const result = manejadorErrorService['obtenerErrorHttpCode'](status);
        //expect
        expect(result).toEqual(error);
    });

    it('deberia obtener el error con el código de status', () => {
        //arrange
        const status = 400;
        const error = HTTP_ERRORES_CODIGO[status];
        //act
        const result = manejadorErrorService['obtenerErrorHttpCode'](status);
        //expect
        expect(result).toEqual(error);
    });

    it('deberia retornar un error del cliente ofline por internet', () => {
        //arrange
        Object.defineProperty(navigator, 'onLine', {
            value: false,
            configurable: true
        });
        const errorResponse = new HttpErrorResponse({});
        const esperado = HTTP_ERRORES_CODIGO.NO_HAY_INTERNET;
        //act
        const result = manejadorErrorService.procesarError(errorResponse);
        //expect
        expect(esperado).toEqual(result);
    });

    it('deberia tener un error 500, no hay un http response', () => {
        //arrange
        const fake = undefined;
        const esperado = HTTP_ERRORES_CODIGO[500];
        //act
        const result = manejadorErrorService.procesarError(fake);
        //expect
        expect(esperado).toEqual(result);
    });

    it('deberia retornar un error con mensaje generico con el status de la respuesta', () => {
        //arrange
        const estatus = 400;
        const errorResponse = new HttpErrorResponse({
            status: estatus,
            error:{}
        });
        const esperado = HTTP_ERRORES_CODIGO[estatus];
        //act
        const result = manejadorErrorService.procesarError(errorResponse);
        //expect
        expect(esperado).toEqual(result);
    });

    it('deberia retornar un error con mensaje dinamico', () => {
        //arrange
        const estatus = 400;
        const esperado = 'Bad request';
        const errorResponse = new HttpErrorResponse({
            status: estatus,
            error:{
                mensaje: esperado
            }
        });
        //act
        const result = manejadorErrorService.procesarError(errorResponse);
        //expect
        expect(esperado).toEqual(result);
    });

    it('deberia retornar un error con mensaje generico por no traer mensaje en la respuesta', () => {
        //arrange
        const estatus = 400;
        const esperado = HTTP_ERRORES_CODIGO[500];
        const errorResponse = new HttpErrorResponse({
            status: estatus,
            error:{
                mensaje: ''
            }
        });
        //act
        const result = manejadorErrorService.procesarError(errorResponse);
        //expect
        expect(esperado).toEqual(result);
    });




});
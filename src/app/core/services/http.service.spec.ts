import { HttpHeaders, HttpParams } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { HttpService } from "./http.service";


describe('HttpService', () => {
    let httpService: HttpService;
    const defaultOpts = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [HttpService]
      });
    }));

    beforeEach(()=>{
        httpService = TestBed.inject(HttpService);
        spyOn(httpService,'createDefaultOptions').and.returnValue(defaultOpts);
    })
  
    it('deberia crear el servicio', () => {
      expect(httpService).toBeTruthy();
    });

    it('deberia obtener opciones por defecto', () => {
        const result = httpService['createOptions'](null);
        expect(result).toEqual(defaultOpts);
    });

    it('deberia obtener opciones', () => {
        let options = {
            headers: new HttpHeaders({'Content-Type':'application/json'}),
            params: new HttpParams()
        };
        const result = httpService['createOptions'](options);
        expect(result).toEqual(options);
    });

    it('deberia obtener opciones añadiendo header content-type en caso de no tenerlo', () => {
        let options = {
            headers: new HttpHeaders({'Authorization':'Bearer token'}),
            params: new HttpParams()
        };
        const result = httpService['createOptions'](options);
        options.headers = options.headers.set('Content-Type','application/json');
        expect(result).toEqual(options);
    });
  
  });
  
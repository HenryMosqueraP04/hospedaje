import {  ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ErrorCamposPlantillaComponent } from './error-campos-plantilla.component';

describe('ErrorCamposPlantillaComponent', () => {
  let component: ErrorCamposPlantillaComponent;
  let fixture: ComponentFixture<ErrorCamposPlantillaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorCamposPlantillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorCamposPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear la directiva', () => {
    expect(component).toBeTruthy();
  });

  it('deberia validar con la directiva', () => {
    //arrange
    const valor = 'validado';
    //act
    component.text =valor;
    fixture.detectChanges();
    //expect
    expect(component.mensajeError).toBe(valor);
    expect(component.ocultar).toBe(false);
  });

  it('deberia validar con la directiva', () => {

    //arrange
    const valor = 'validado';
    component.mensajeError = valor;
    //act
    component.text =valor;
    fixture.detectChanges();
    //expect
    expect(component.mensajeError).toBe(valor);
    expect(component.ocultar).toBe(true);
  });

});


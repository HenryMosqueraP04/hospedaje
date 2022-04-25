import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalExitoComponent } from './modal-exito.component';

describe('ModalExitoComponent', () => {
  let component: ModalExitoComponent;
  let fixture: ComponentFixture<ModalExitoComponent>;

  // Servicios
  let ngbActiveModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalExitoComponent],
      imports: [],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExitoComponent);
    component = fixture.componentInstance;

    ngbActiveModal = TestBed.inject(NgbActiveModal);

    fixture.detectChanges();
  });

  it('deberia crear el componente', () => {
    //expect
    expect(component).toBeTruthy();
  });

  it('deberia descartar el modal con alguna respuesta', () => {
    spyOn(ngbActiveModal, 'dismiss');
    //act
    component.onClickDismiss('respuesta');
    //expect
    expect(ngbActiveModal.dismiss).toHaveBeenCalled();
  });
});

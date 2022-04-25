import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalErrorComponent } from './modal-error.component';


describe('ModalErrorComponent', () => {
  let component: ModalErrorComponent;
  let fixture: ComponentFixture<ModalErrorComponent>;

  // Servicios
  let ngbActiveModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalErrorComponent],
      imports: [],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalErrorComponent);
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

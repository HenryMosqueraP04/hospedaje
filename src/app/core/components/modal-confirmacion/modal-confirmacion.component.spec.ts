import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalConfirmacionComponent } from './modal-confirmacion.component';

describe('ModalConfirmacionComponent', () => {
  let component: ModalConfirmacionComponent;
  let fixture: ComponentFixture<ModalConfirmacionComponent>;

  // Servicios
  let ngbActiveModal: NgbActiveModal;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalConfirmacionComponent],
      imports: [],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmacionComponent);
    component = fixture.componentInstance;

    ngbActiveModal = TestBed.inject(NgbActiveModal);

    fixture.detectChanges();
  });

  it('deberia crear el componente', () => {
    //expect
    expect(component).toBeTruthy();
  });

  it('deberia cerrar el modal con alguna respuesta', () => {
    spyOn(ngbActiveModal, 'close');
    //act
    component.onClickClose(true);
    //expect
    expect(ngbActiveModal.close).toHaveBeenCalled();
  });

});

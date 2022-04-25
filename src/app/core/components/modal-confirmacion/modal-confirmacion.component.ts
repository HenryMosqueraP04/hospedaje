import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css']
})
export class ModalConfirmacionComponent implements OnInit {

  public titulo: string = 'Confirmar';
  public mensaje: string = '¿Desea realizar esta acción?';
  
  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onClickClose(res:boolean):void{
    this.modal.close(res);
  };

}

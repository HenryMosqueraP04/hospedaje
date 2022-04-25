import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-exito',
  templateUrl: './modal-exito.component.html',
  styleUrls: ['./modal-exito.component.css']
})
export class ModalExitoComponent implements OnInit {

  public titulo: string = 'Éxito';
  public mensaje: string = 'La acción ha sido exitosa';
  
  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onClickDismiss(res:string):void{
    this.modal.dismiss(res);
  };

}

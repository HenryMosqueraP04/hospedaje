import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css']
})
export class ModalErrorComponent implements OnInit {

  public titulo :string = 'Error';
  public mensaje: string = 'Ha ocurrido un error';
  
  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  onClickDismiss(res:string):void{
    this.modal.dismiss(res);
  };

}

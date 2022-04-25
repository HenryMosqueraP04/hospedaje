import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-cargando',
  templateUrl: './modal-cargando.component.html',
  styleUrls: ['./modal-cargando.component.css']
})
export class ModalCargandoComponent implements OnInit {

  public titulo = 'Cargando';

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalCargandoComponent } from '@core/components/modal-cargando/modal-cargando.component';
import { ModalConfirmacionComponent } from '@core/components/modal-confirmacion/modal-confirmacion.component';
import { ModalErrorComponent } from '@core/components/modal-error/modal-error.component';
import { ModalExitoComponent } from '@core/components/modal-exito/modal-exito.component';
import { ManejadorErrorService } from '@core/services/manejador-error.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DtoReserva } from '@reserva/shared/model/reserva';
import { DtoTcrm } from '@reserva/shared/model/tcrm';
import { ReservaService } from '@reserva/shared/service/reserva.service';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
  styleUrls: ['./listar-reserva.component.css']
})
export class ListarReservaComponent implements OnInit {

  public titulo: string = "Lista de reservas";
  public encabezadoTablaReserva: string[] = ["Id", "Usuario", "Habitación", "Tipo", "Pago", "Valor", "Inicio", "Fin", "Opciones"];
  public reservas: DtoReserva[] = [];
  public tituloTCRM: string = "Valor actual del TCRM";
  public tcrm: DtoTcrm | null = null;

  public confirmacionEliminar = '¿Desea eliminar la reserva?'
  public exitoEliminar: string = 'Se ha eliminado exitosamente la reserva';

  constructor(
    private reservaService: ReservaService,
    private modalService: NgbModal,
    private errorService: ManejadorErrorService
  ) {
  }

  ngOnInit(): void {
    this.consultar();
    this.obtenerTCRM();
  }


  // Eventos

  public onClickEliminarReserva(dtoReserva: DtoReserva, index: number): void {
    const refConfirmacion = this.modalService.open(ModalConfirmacionComponent, { animation: true, backdrop: 'static', keyboard: false });

    refConfirmacion.componentInstance.mensaje = this.confirmacionEliminar;

    refConfirmacion.result.then((value: boolean) => {
      if (value) {
        this.eliminar(dtoReserva, index);
      }
    }
    );
  }


  // Fetch

  private eliminar(dtoReserva: DtoReserva, index: number): void {

    this.modalService.open(ModalCargandoComponent, { animation: true, backdrop: 'static', keyboard: false });

    this.reservaService.eliminar(dtoReserva).subscribe(
      () => {
        this.modalService.dismissAll();
        const refExito = this.modalService.open(ModalExitoComponent, { animation: true, backdrop: 'static', keyboard: false });
        refExito.componentInstance.mensaje = this.exitoEliminar;

        this.reservas = [...this.reservas];
        this.reservas.splice(index, 1);
      },
      (err) => {
        this.modalService.dismissAll();
        const refError = this.modalService.open(ModalErrorComponent, { animation: true, backdrop: 'static', keyboard: false });
        refError.componentInstance.mensaje = this.errorService.procesarError(err);
      }
    );
  }

  private consultar(): void {

    this.modalService.open(ModalCargandoComponent, { animation: true, backdrop: 'static', keyboard: false });

    this.reservaService.consultar().subscribe(
      (res) => {
        this.reservas = res;
        this.modalService.dismissAll();
      },
      (err) => {
        this.modalService.dismissAll();
        const refError = this.modalService.open(ModalErrorComponent, { animation: true, backdrop: 'static', keyboard: false });
        refError.componentInstance.mensaje = this.errorService.procesarError(err);
      }
    );
  }

  private obtenerTCRM(): void {
    this.reservaService.obtenerTCRM().subscribe(
      res => this.tcrm = this.reservaService.obtenerValorTCRM(res),
      () => { }
    );
  }

}

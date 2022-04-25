import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalCargandoComponent } from '@core/components/modal-cargando/modal-cargando.component';
import { ModalConfirmacionComponent } from '@core/components/modal-confirmacion/modal-confirmacion.component';
import { ModalErrorComponent } from '@core/components/modal-error/modal-error.component';
import { FechaService } from '@core/services/fecha.service';
import { ManejadorErrorService } from '@core/services/manejador-error.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DtoHabitacion } from '@reserva/shared/model/habitacion';
import { DtoReserva, Reserva } from '@reserva/shared/model/reserva';
import { DtoTipoPago } from '@reserva/shared/model/tipo-pago';
import { HabitacionService } from '@reserva/shared/service/habitacion.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { TipoPagoService } from '@reserva/shared/service/tipo-pago.service';
import * as moment from 'moment';

@Component({
  selector: 'app-actualizar-reserva',
  templateUrl: './actualizar-reserva.component.html',
  styleUrls: ['./actualizar-reserva.component.css']
})
export class ActualizarReservaComponent implements OnInit {

  public titulo: string = 'Actualizar reserva';
  public confirmacionActualizar = '¿Desea actualizar la reserva?';
  public errorParametro = 'Parámetro erróneo';

  public reservaForm: FormGroup;

  public dtoReserva: DtoReserva | null = null;
  public habitaciones: DtoHabitacion[] = [];
  public tipoPagos: DtoTipoPago[] = [];

  constructor(
    private reservaService: ReservaService,
    private habitacionService: HabitacionService,
    private tipoPagoService: TipoPagoService,
    private modalService: NgbModal,
    private router: Router,
    private errorService: ManejadorErrorService,
    private fechaService: FechaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.crearFormulario();
    this.obtenerPorId(id);
    this.consultarHabitaciones();
    this.consultarTipoPagos();
  }

  // Eventos

  public onSubmitActualizar(event: Event): void {
    event.preventDefault();
    if (this.reservaForm.valid) {
      const refConfirmacion = this.modalService.open(ModalConfirmacionComponent, { animation: true, backdrop: 'static', keyboard: false });
      refConfirmacion.componentInstance.mensaje = this.confirmacionActualizar;
      refConfirmacion.result.then((value: boolean) => {
        if (value) {
          const reserva:Reserva = this.crearEntidad();
          this.actualizar(reserva);
        }
      });

    }
  }


  // Fetch
  private consultarHabitaciones(): void {
    this.habitacionService.consultar().subscribe(
      (res) => {
        this.habitaciones = res;
      },
      () => {
      }
    );
  }

  private consultarTipoPagos(): void {
    this.tipoPagoService.consultar().subscribe(
      (res) => {
        this.tipoPagos = res;
      },
      () => {
      }
    );
  }

  private obtenerPorId(id:number): void {
    this.modalService.open(ModalCargandoComponent, { animation: true, backdrop: 'static', keyboard: false });
    this.reservaService.obtenerPorId(id).subscribe(
      (res) => {
        this.dtoReserva = res;
        this.modalService.dismissAll();
        this.inicializarFormulario();
      },
      (err) => {
        this.modalService.dismissAll();
        const refError= this.modalService.open(ModalErrorComponent, { animation: true, backdrop: 'static', keyboard: false });
        refError.componentInstance.mensaje = this.errorService.procesarError(err);
      }
    );
  }

  private actualizar(reserva: Reserva): void {
    this.modalService.open(ModalCargandoComponent, { animation: true, backdrop: 'static', keyboard: false });
    this.reservaService.actualizar(reserva).subscribe(
      () => {
        this.modalService.dismissAll();
        this.router.navigate(['/reserva']);
      },
      (err) => {
        this.modalService.dismissAll();
        const refError= this.modalService.open(ModalErrorComponent, { animation: true, backdrop: 'static', keyboard: false });
        refError.componentInstance.mensaje = this.errorService.procesarError(err);
      }
    );
  }

  // utilidad

  private crearFormulario(): void {
    this.reservaForm = new FormGroup({
      fechaInicio: new FormControl('', Validators.required),
      horaInicio: new FormControl('', Validators.required),
      hora: new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
      habitacionId: new FormControl('', Validators.required),
      tipoPagoId: new FormControl('', Validators.required),
      usuarioId: new FormControl('', Validators.required)
    })
  }

  private inicializarFormulario(){
    
    const fechaInicioReal:moment.Moment = moment(this.dtoReserva.fechaInicio);
    const fechaFinReal:moment.Moment = moment(this.dtoReserva.fechaFin);
    const fecha: string = fechaInicioReal.format("YYYY-MM-DD");
    const hora: string = fechaInicioReal.format("HH:mm:ss");
    const horaOcupacion = moment.duration(fechaFinReal.diff(fechaInicioReal)).asHours();

    this.reservaForm.patchValue({
      fechaInicio: fecha,
      horaInicio: hora,
      hora: horaOcupacion,
      habitacionId: this.dtoReserva.habitacionId,
      tipoPagoId: this.dtoReserva.tipoPagoId,
      usuarioId: this.dtoReserva.usuarioId
    })

  }

  private crearEntidad(): Reserva {
    const usuarioId: number = this.reservaForm.controls.usuarioId.value;
    const habitacionId: number = this.reservaForm.controls.habitacionId.value;
    const tipoPagoId: number = this.reservaForm.controls.tipoPagoId.value;
    const fechaInicio: string = this.reservaForm.controls.fechaInicio.value;
    const horaInicio: string = this.reservaForm.controls.horaInicio.value;
    const hora: number = this.reservaForm.controls.hora.value;

    const fechaInicioReal = this.fechaService.obtenerFecha(fechaInicio, horaInicio);
    const fechaFinReal = moment(fechaInicioReal).add(hora, 'hours');
    return new Reserva(usuarioId, habitacionId, tipoPagoId, this.fechaService.formatearFecha(fechaInicioReal), this.fechaService.formatearFecha(fechaFinReal), this.dtoReserva.id);
  }

}

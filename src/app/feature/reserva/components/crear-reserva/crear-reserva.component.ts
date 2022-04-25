import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalCargandoComponent } from '@core/components/modal-cargando/modal-cargando.component';
import { ModalConfirmacionComponent } from '@core/components/modal-confirmacion/modal-confirmacion.component';
import { ModalErrorComponent } from '@core/components/modal-error/modal-error.component';
import { FechaService } from '@core/services/fecha.service';
import { ManejadorErrorService } from '@core/services/manejador-error.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DtoHabitacion } from '@reserva/shared/model/habitacion';
import { Reserva } from '@reserva/shared/model/reserva';
import { DtoTipoPago } from '@reserva/shared/model/tipo-pago';
import { DtoUsuario } from '@reserva/shared/model/usuario';
import { HabitacionService } from '@reserva/shared/service/habitacion.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { TipoPagoService } from '@reserva/shared/service/tipo-pago.service';
import { UsuarioService } from '@reserva/shared/service/usuario.service';
import * as moment from 'moment';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {

  public titulo: string = 'Crear reserva';
  public confirmacionCrear = "¿Desea crear la reserva?";
  public fechaActual = moment();

  public reservaForm: FormGroup;

  public habitaciones: DtoHabitacion[] = [];
  public tipoPagos: DtoTipoPago[] = [];
  public usuarios: DtoUsuario[] = [];

  constructor(
    private reservaService: ReservaService,
    private habitacionService: HabitacionService,
    private tipoPagoService: TipoPagoService,
    private usuarioService: UsuarioService,
    private modalService: NgbModal,
    private router: Router,
    private errorService: ManejadorErrorService,
    private fechaService: FechaService
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.consultarHabitaciones();
    this.consultarTipoPagos();
    this.consultarUsuarios();
  }

  // Eventos

  public onSubmitCrearReserva(event: Event): void {
    event.preventDefault();
    if (this.reservaForm.valid) {
      const refConfirmacion = this.modalService.open(ModalConfirmacionComponent, { animation: true, backdrop: 'static', keyboard: false });
      refConfirmacion.componentInstance.mensaje = this.confirmacionCrear;
      refConfirmacion.result.then((value: boolean) => {
        if (value) {
          const reserva:Reserva = this.crearEntidad();
          this.guardar(reserva);
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

  private consultarUsuarios(): void {
    this.usuarioService.consultar().subscribe(
      (res) => {
        this.usuarios = res;
      },
      () => {
      }
    );
  }

  private guardar(reserva: Reserva): void {
    this.modalService.open(ModalCargandoComponent, { animation: true, backdrop: 'static', keyboard: false });
    this.reservaService.guardar(reserva).subscribe(
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
    const fecha: string = this.fechaActual.format("YYYY-MM-DD");
    const hora: string = this.fechaActual.format("HH:mm:ss");
    const horaMinima: number = 1;

    this.reservaForm = new FormGroup({
      fechaInicio: new FormControl(fecha, Validators.required),
      horaInicio: new FormControl(hora, Validators.required),
      hora: new FormControl(horaMinima, Validators.compose([Validators.required, Validators.min(1)])),
      habitacionId: new FormControl('', Validators.required),
      tipoPagoId: new FormControl('', Validators.required),
      usuarioId: new FormControl('', Validators.required)
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
    return new Reserva(usuarioId, habitacionId, tipoPagoId, this.fechaService.formatearFecha(fechaInicioReal), this.fechaService.formatearFecha(fechaFinReal));
  }



}

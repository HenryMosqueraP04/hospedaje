
export class Reserva {

    id: number;
    usuarioId: number;
    habitacionId: number;
    tipoPagoId: number;
    valor: number;
    estado: boolean;
    fechaInicio: any;
    fechaFin: any;

    constructor(
        usuarioId: number,
        habitacionId: number,
        tipoPagoId: number,
        fechaInicio: any,
        fechaFin: any,
        id?:number,
        ) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.habitacionId = habitacionId;
        this.tipoPagoId = tipoPagoId;
        this.valor = 0;
        this.estado = true;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }
}

export interface DtoReserva{
    id: number;
    usuarioId: number;
    habitacionId: number;
    tipoPagoId: number;
    valor: number;
    estado: boolean;
    fechaInicio: any;
    fechaFin: any;
    nombreHabitacion:string;
    nombreTipoHabitacion:string;
    nombreTipoPago:string;
    nombreUsuario:string;
}

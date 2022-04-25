import { by, element } from 'protractor';

export class NavbarPage {

    private rutas: any[] = [
        { url: '/home', nombre: 'Home' },
        { url: '/reserva', nombre: 'Reservas' }
    ];

    private linkReserva = element(by.id(this.rutas[1].nombre));

    async clickLinkReservas() {
        await this.linkReserva.click();
    }
}

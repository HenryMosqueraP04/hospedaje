import { by, element } from "protractor";

export class ModalConfirmacionPage {

    private botonCrearReserva = element(by.id('btnAceptarCrearReserva'));

    async clickBotonCrearReserva() {
        await this.botonCrearReserva.click();
    }
}

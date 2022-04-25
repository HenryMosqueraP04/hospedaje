import { by, element } from "protractor";

export class ListarReservaPage {
  private linkCrearReserva = element(by.id('linkCrearReserva'));
  private reservas = element.all(by.css('tbody tr'));

  async clickLinkCrearReserva() {
    await this.linkCrearReserva.click();
  }

  async linkActualizarReserva(index: number) {
    await element(by.id('linkActualizarReserva' + index)).click();
  }

  async botonEliminarReserva(index: number) {
    await element(by.id('botonEliminarReserva' + index)).click();
  }

  async contarReservas() {
    return await this.reservas.count();
  }

}

import { by, element, ElementFinder } from "protractor";

export class CrearReservaPage {

    private selectHabitacionId = element(by.id('habitacionId'));
    private selectTipoPagoId = element(by.id('tipoPagoId'));
    private selectUsuarioId = element(by.id('usuarioId'));
    private formCrearReserva = element(by.id('formCrearReserva'));

    async ingresarHabitacionId(index:number) {
        await this.seleccionarOpcion(this.selectHabitacionId, index);
    }

    async ingresarTipoPagoId(index:number) {
        await this.seleccionarOpcion(this.selectTipoPagoId, index);
    }

    async ingresarUsuarioId(index:number) {
        await this.seleccionarOpcion(this.selectUsuarioId, index);
    }

    async submitFormCrearReserva() {
        await this.formCrearReserva.submit();
    }

    private async seleccionarOpcion(elemento:ElementFinder, index:number){
        await elemento.click()
        await elemento.all(by.tagName('option')).get(index).click();
    }

}
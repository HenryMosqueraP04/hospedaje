import { by, element, ElementFinder } from "protractor";

export class ActualizarReservaPage {

    private selectHabitacionId = element(by.id('habitacionId'));
    private selectTipoPagoId = element(by.id('tipoPagoId'));
    private formActualizarReserva = element(by.id('formActualizarReserva'));

    async ingresarHabitacionId(index:number) {
        await this.seleccionarOpcion(this.selectHabitacionId, index);
    }

    async ingresarTipoPagoId(index:number) {
        await this.seleccionarOpcion(this.selectTipoPagoId, index);
    }

    async submitFormActualizarReserva() {
        await this.formActualizarReserva.submit();
    }

    private async seleccionarOpcion(elemento:ElementFinder,index:number){
        await elemento.click()
        await elemento.all(by.tagName('option')).get(index).click();
    }

}
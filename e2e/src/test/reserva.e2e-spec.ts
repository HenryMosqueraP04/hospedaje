import { browser } from "protractor";
import { AppPage } from "../app.po";
import { ModalConfirmacionPage } from "../page/modal-confirmacion/modal-confirmacion.po";
import { NavbarPage } from "../page/navbar/navbar.po";
import { ActualizarReservaPage } from "../page/reserva/actualizar-reserva.po";
import { CrearReservaPage } from "../page/reserva/crear-reserva.po";
import { ListarReservaPage } from "../page/reserva/listar-reserva.po";

describe('workspace-project CRUD reserva', () => {
    let appPage: AppPage;
    let navBarPage: NavbarPage;
    let listarReservaPage: ListarReservaPage;
    let crearReservaPage: CrearReservaPage;
    let actualizarReservaPage: ActualizarReservaPage;
    let modalConfirmacionPage: ModalConfirmacionPage;

    beforeEach(() => {
        appPage = new AppPage();
        navBarPage = new NavbarPage();
        listarReservaPage = new ListarReservaPage();
        actualizarReservaPage = new ActualizarReservaPage();
        crearReservaPage = new CrearReservaPage();
        modalConfirmacionPage = new ModalConfirmacionPage();
    });

    it('Deberia hacer el crud de la reserva', () => {

        // crear

        appPage.navigateTo();
        navBarPage.clickLinkReservas();
        browser.sleep(2000);
        listarReservaPage.clickLinkCrearReserva();

        const actualCrear = listarReservaPage.contarReservas();

        browser.sleep(1000);
        crearReservaPage.ingresarHabitacionId(1);
        browser.sleep(1000);
        crearReservaPage.ingresarTipoPagoId(1);
        browser.sleep(1000);
        crearReservaPage.ingresarUsuarioId(1);
        browser.sleep(1000);

        crearReservaPage.submitFormCrearReserva();
        browser.sleep(2000);
        modalConfirmacionPage.clickBotonCrearReserva();

        const esperadoCrear = listarReservaPage.contarReservas();

        expect(esperadoCrear).toBeGreaterThan(actualCrear);

        // actualizar
        const actualActualizar = listarReservaPage.contarReservas();
        browser.sleep(2000);
        listarReservaPage.linkActualizarReserva(0);
        browser.sleep(2000);

        actualizarReservaPage.ingresarHabitacionId(2);
        browser.sleep(1000);
        actualizarReservaPage.ingresarTipoPagoId(2);
        browser.sleep(1000);

        actualizarReservaPage.submitFormActualizarReserva();
        browser.sleep(2000);
        modalConfirmacionPage.clickBotonCrearReserva();

        const esperadoActualizar = listarReservaPage.contarReservas();

        expect(esperadoActualizar).toEqual(actualActualizar);

        // eliminar

        browser.sleep(2000);
        listarReservaPage.botonEliminarReserva(0);
        browser.sleep(1000);

        modalConfirmacionPage.clickBotonCrearReserva();
        browser.sleep(1000);

        const actualEliminar = listarReservaPage.contarReservas();

        expect(0).toEqual(actualEliminar);

    });


});
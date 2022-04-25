import { AppPage } from "../app.po";
import { NavbarPage } from "../page/navbar/navbar.po";
import { ListarReservaPage } from "../page/reserva/listar-reserva.po";

describe('workspace-project Listar reservas', () => {
    let appPage: AppPage;
    let navBarPage: NavbarPage;
    let listarReservaPage: ListarReservaPage;

    beforeEach(() => {
        appPage = new AppPage();
        navBarPage = new NavbarPage();
        listarReservaPage = new ListarReservaPage();
    });

    it('Deberia navagar a la pagina de crear reservas', () => {
        appPage.navigateTo();
        navBarPage.clickLinkReservas();
        listarReservaPage.clickLinkCrearReserva();
    });

    it('Deberia listar las reservas', () => {
        const reservasEsperadas = 0;
        appPage.navigateTo();
        navBarPage.clickLinkReservas();
        expect(listarReservaPage.contarReservas()).toBeGreaterThanOrEqual(reservasEsperadas);
    });

    
});

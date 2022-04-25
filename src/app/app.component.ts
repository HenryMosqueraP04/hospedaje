import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public rutas: MenuItem[] = [
    { url: '/home', nombre: 'Home' },
    { url: '/reserva', nombre: 'Reservas' }
  ];

  
}

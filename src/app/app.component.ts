import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
   {
    category: 'Goals',
    pages: [
      { title: 'Inicio', url: '/home', icon: 'home' },
      { title: 'Companhias', url: '/companies', icon: 'business' },
      { title: 'Times', url: '/teams', icon: 'people' },
      { title: 'Usuários', url: '/users', icon: 'person' },
    ]
   },
   {
    category: 'IA',
    pages: [
      { title: 'Mapa estratégico', url: '/strategic-map', icon: 'chatbubbles' },
    ]
   }
  ];
  public labels = [];
  constructor(public router: Router) {}
}

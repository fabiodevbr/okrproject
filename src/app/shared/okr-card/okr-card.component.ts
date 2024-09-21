import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-okr-card',
  templateUrl: './okr-card.component.html',
  styleUrls: ['./okr-card.component.scss']
})
export class OkrCardComponent {
  @Input() okr: any;

  // Exemplo de dados de entrada
  ngOnInit() {
   
  }
}

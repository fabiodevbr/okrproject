import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss'],
})
export class ListMenuComponent  implements OnInit {

  hoveredOption: any = null;

  @Input() options: any;

  @Input() menuBottom: boolean = true;

  @Output() selectedOption = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() {}

  selectOption(action: any) {
    this.selectedOption.emit(action);
  }

}

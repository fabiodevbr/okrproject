import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-list-okr',
  templateUrl: './card-list-okr.component.html',
  styleUrls: ['./card-list-okr.component.scss'],
})
export class CardListOkrComponent  implements OnInit {
  searchQuery: string = '';

  // filteredUsers = [...this.users];

  onSearch() {
    // this.filteredUsers = this.users.filter(user =>
    //   user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    // );
  }

  @Output() addTeam = new EventEmitter<any>();
  @Output() editTeam = new EventEmitter<any>();

  @Input() subChatStep: boolean = true;



  teams = [
    { id: '1', name: 'Vender 1 milhão', kpiHealth: 0, },
    { id: '2', name: 'Vender 1 milhão', kpiHealth: 0,  },
    { id: '3', name: 'Vender 1 milhão', kpiHealth: 0, }
  ]

  ngOnInit(): void {
      
  }

  onViewMore() {

  }

  onAddUser() {
    this.addTeam.emit();
    this.subChatStep = false;
  }

  onEditUser(user: any) {
    this.editTeam.emit(user)
  }
}

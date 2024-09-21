import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-list-team',
  templateUrl: './card-list-team.component.html',
  styleUrls: ['./card-list-team.component.scss'],
})
export class CardListTeamComponent  implements OnInit {
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
    { id: '1', name: 'João Silva', leader: 'Fábio Andrade', users: ['', ''] },
    { id: '2', name: 'Maria Oliveira', leader: 'Fábio Andrade', users: ['', ''] },
    { id: '3', name: 'Pedro Costa', leader: 'Fábio Andrade', users: ['', ''] }
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/core/services/firebase.service';

interface User {
  email: string;
  name: string;
  jobTitle: string;
  role: 'admin' | 'user';
}

@Component({
  selector: 'app-card-list-user',
  templateUrl: './card-list-user.component.html',
  styleUrls: ['./card-list-user.component.scss'],
})

export class CardListUserComponent  implements OnInit {

  searchQuery: string = '';

  showSearchUser: boolean = false;

  public isFocused = false;

  @Input() titleList: string = '';

  @Input() idTeam: string = '';

  @Input() team: any;

  searchUser: string = '';

  showFilterUsers: boolean = false;
  usersSelect!: Observable<any[]>;

  // filteredUsers = [...this.users];

  onSearch(event: any) {
    let filter = event.target.value;
    if (filter.length > 2) {
      this.showFilterUsers = true;
      this.usersSelect = this.fsService.searchItems(filter, 'Users');
    }

    if (filter.length === 0) {
      this.showFilterUsers = false;
      this.usersSelect = new Observable<any[]>
    }
  }

  @Output() addUser = new EventEmitter<any>();
  @Output() editUser = new EventEmitter<any>();
  @Output() deleteUser = new EventEmitter<any>();

  @Input() subChatStep: boolean = true;

  users!: Observable<any[]>;

  constructor(private fsService: FirebaseService) {}

  ngOnInit(): void {
    this.users = this.fsService.searchUsersByTeam(this.idTeam, 'Users');
  }

  onViewMore() {

  }

  removeTeam() {
    this.fsService.deleteItem(this.idTeam, 'Teams');
  }

  onBlur() {
    setTimeout(() => {
      this.isFocused = false;
    }, 100);
  }

  onAddUser() {
    this.showSearchUser = true;
    this.addUser.emit();
    this.subChatStep = false;
  }

  onEditUser(user: any) {
    this.editUser.emit(user)
  }

  onDeleteUser(user: any) {
    // this.fsService.deleteItem(user.id, 'Users')
  }

  updateNameList() {
    const teamUpdated = {...this.team, name: this.titleList};
    this.fsService.updateItem(this.idTeam, teamUpdated, 'Teams');
  }

  selectUser(user: any) {
    let arrayUserTeams;
    if (user?.teams) {
      user.teams.push(this.idTeam);
      console.log(user.teams);
      arrayUserTeams = user.teams;
    }else {
      arrayUserTeams = [this.idTeam]
    }

    const updatedUser = {...user, teams: arrayUserTeams}

    console.log(updatedUser)

    this.fsService.updateItem(user.id, updatedUser, 'Users');

    this.showFilterUsers = false;
    this.searchUser = '';
    this.showSearchUser = false;
  }
}

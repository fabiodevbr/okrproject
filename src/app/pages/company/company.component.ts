import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { FormAddUserComponent } from 'src/app/shared/form-add-user/form-add-user.component';

interface ITeam {
  name: string,
  leader: string
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent  implements OnInit {

  public creatingTitleList: string = '';
  public showCreatingTeam: boolean = false;
  leaders = [
    { id: 1, name: 'Líder 1' },
    { id: 2, name: 'Líder 2' },
    { id: 3, name: 'Líder 3' },
  ];
  filteredLeaders: any = [];
  creatingSelectedLeaderName: any;

  listTeams: Observable<any[]> = this.fsService.getItems('Teams');
  users!: Observable<any[]>;
  showFilterUsers: boolean = false;
  creatingSelectedLeader: any;

  constructor(private fsService: FirebaseService, private modalCtrl: ModalController) { }

  ngOnInit() {}

  filterLeaders(event: any) {
    // const value = this.teamForm.get('teamLeader')!.value.toLowerCase();
    this.filteredLeaders = this.leaders.filter(leader =>
      leader.name.toLowerCase().includes(event.target.value)
    );
  }

  selectLeader(leader: any) {
    // this.teamForm.get('teamLeader')!.setValue(leader.name);
    this.creatingSelectedLeaderName = leader.name;
    this.creatingSelectedLeader = leader;
    this.showFilterUsers = false;
  }
  
  selectOption(opt: string) {

  }

  onSearch(event: any) {
    let filter = event.target.value;
    if (filter.length > 2) {
      this.showFilterUsers = true;
      this.users = this.fsService.searchItems(filter, 'Users');
    }

    if (filter.length === 0) {
      this.showFilterUsers = false;
      this.users = this.fsService.getItems('Users');
    }
  }

  saveNewTeam() {
    this.fsService.addItem({name: this.creatingTitleList, leader: this.creatingSelectedLeaderName}, 'Teams').then((newTeam: DocumentReference) => {
      const idTeam = newTeam.id;
      let arrayLeaderTeams;


      if (this.creatingSelectedLeader?.teams) {
        this.creatingSelectedLeader?.teams.push(idTeam);
        arrayLeaderTeams = this.creatingSelectedLeader.teams;
      }else {
        arrayLeaderTeams = [idTeam]
      }

      this.creatingSelectedLeader = {...this.creatingSelectedLeader, teams: arrayLeaderTeams};

      this.fsService.updateItem(this.creatingSelectedLeader.id, this.creatingSelectedLeader, 'Users');
      this.showCreatingTeam = false;
      this.creatingSelectedLeaderName = '';
      this.creatingTitleList = '';
    });
  }

  async addNewUser() {
    const modal = await this.modalCtrl.create({
      component: FormAddUserComponent,
    });
    modal.present();
  }

  deleteUser(user: any) {

  }

}

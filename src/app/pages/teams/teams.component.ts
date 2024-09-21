import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent  implements OnInit {

  public listTeams: any[] = [
    {
      name: 'Leader',
      leader: 'Flávio Andrade',
      members: ['asdasda', 'asdasd'],
      kpiEnabled: true
    }
  ]

  constructor() { }

  ngOnInit() {}

}

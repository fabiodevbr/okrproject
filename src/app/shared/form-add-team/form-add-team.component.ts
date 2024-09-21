import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-add-team',
  templateUrl: './form-add-team.component.html',
  styleUrls: ['./form-add-team.component.scss'],
})
export class FormAddTeamComponent  implements OnInit {
  @Input() teamForm: FormGroup;
  leaders = [
    { id: 1, name: 'Líder 1' },
    { id: 2, name: 'Líder 2' },
    { id: 3, name: 'Líder 3' },
  ];
  users = [
    { id: 1, name: 'Usuário 1' },
    { id: 2, name: 'Usuário 2' },
    { id: 3, name: 'Usuário 3' },
  ];
  @Input() id: string = '';
  filteredLeaders: any = [];

  constructor(private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      teamLeader: ['', Validators.required],
      teamMembers: [[], Validators.required],
    });
    
  }

  filterLeaders() {
    const value = this.teamForm.get('teamLeader')!.value.toLowerCase();
    this.filteredLeaders = this.leaders.filter(leader =>
      leader.name.toLowerCase().includes(value)
    );
  }

  selectLeader(leader: any) {
    this.teamForm.get('teamLeader')!.setValue(leader.name);
    this.filteredLeaders = [];
  }


  ngOnInit() {
    
  }

  onSubmit() {
    if (this.teamForm.valid) {
      console.log(this.teamForm.value);
      // Aqui você pode adicionar a lógica para enviar os dados do formulário
    }
  }

}

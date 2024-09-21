import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ApiServicesService } from 'src/app/core/services/api-services.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-form-add-user',
  templateUrl: './form-add-user.component.html',
  styleUrls: ['./form-add-user.component.scss'],
})
export class FormAddUserComponent  implements OnInit {

  @Input() userForm: FormGroup;
  
  @Output() addUser = new EventEmitter<any>();

  @Input() user: any = '';

  @Input() id: string = '';
  
  constructor(private fb: FormBuilder, private apiService: ApiServicesService, private modalCtrl: ModalController, private fsService: FirebaseService) {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      jobTitle: [''],
      role: ['User']
    });
  }
 
  ngOnInit() {}

  onSubmit() {
    const userData = {...this.userForm.value, valueName: this.fsService.normalizeString(this.userForm.value.name)};

    this.fsService.addItem(userData, 'PossibleNewUsers').then(user => {
      this.sendEmail(userData.email, userData.name, `https://okrproject-92b70.web.app/invited/${user.id}`)
    });

    this.modalCtrl.dismiss();
  }

  sendEmail(to: string, name: string, url: string) {
    const subject = 'Assunto do E-mail';
    const text = name;

    this.apiService.sendEmail(to, subject, text, url).subscribe(
      response => {
        console.log('E-mail enviado com sucesso!', response);
      },
      error => {
        console.error('Erro ao enviar e-mail', error);
      }
    );
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { StrategicMapComponent } from '../strategic-map/strategic-map.component';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-okr-chat',
  templateUrl: './okr-chat.component.html',
  styleUrls: ['./okr-chat.component.scss'],
})
export class OkrChatComponent  implements OnInit {

  @ViewChild('chatMessages') chatMessages: ElementRef | undefined;
  
  options = [
    {
      title: 'Usuários',
      icon: 'person',
      actions: ['Verificar usuários', 'Adicionar usuário']
    },
    {
      title: 'Times',
      icon: 'people',
      actions: ['Verificar times', 'Adicionar time']
    },
    {
      title: 'OKR',
      icon: 'business',
      actions: ['Mapa estratégico', 'Companhia']
    }
  ];

  chatStep: string = 'message';
  subChatStep: string = '';

  userForm: FormGroup;
  teamForm: FormGroup;

  idFormUser: string = '';

  constructor(private fb: FormBuilder, private toastService: ToastController, private fsService: FirebaseService, private modalCtrl: ModalController) {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      jobTitle: [''],
      role: ['User']
    });

    this.teamForm = this.fb.group({
      teamName: ['', Validators.required],
      teamLeader: ['', Validators.required],
      teamMembers: [[], Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    console.log(this.userForm.value);
    // Aqui você pode lidar com a submissão do formulário
  }

  selectOption(action: string, event?: any) {
    switch (action) {
      case 'Verificar usuários':
          this.chatStep = 'verifyUser';
          this.subChatStep = 'actions-card';
          this.sendMessage(true, 'Verificar usuários');
        break;

        case 'Adicionar usuário':
          this.onAddUser();
        break;

        case 'Editar usuário':
          this.sendMessage(true, action, event);
        break;

        case 'Verificar times':
          this.chatStep = 'verifyTeam';
          this.subChatStep = 'actions-card';
          this.sendMessage(true, 'Verificar times');
        break;

        case 'Adicionar time':
          this.onAddTeam();
        break;

        case 'Mapa estratégico':
          this.sendMessage(true, action, event);
        break;
    
      default:
        break;
    }
  }



  messages: { text: string, user: boolean, type?: string, users?: any[] }[] = [
    // { text: 'Oi! Estou tentando criar um chat em Angular.', user: true },
  ];

  searchQuery: string = '';

  // filteredUsers = [...this.users];

  onSearch() {
    // this.filteredUsers = this.users.filter(user =>
    //   user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    // );
  }

  newMessage: string = '';

  onViewMore() {
    // Ação para carregar mais usuários ou navegar para outra página
    console.log('Ver mais usuários');
    this.subChatStep = '';
  }

  onAddUser() {
    // Ação para adicionar um novo usuário
    this.idFormUser = '';
    this.userForm.patchValue({
      email: '',
      name: '',
    jobTitle: '',
    role: 'User',
    status: [false]})
    this.subChatStep = '';
    this.sendMessage(true, 'Adicionar novo usuário');
    this.sendMessage(false, 'Preencha o formulário abaixo para adicionar um usuário');
    this.chatStep = 'addUser'
  }

  onAddTeam() {
    // Ação para adicionar um novo usuário
    this.idFormUser = '';
    this.teamForm.patchValue({
      teamName: '',
      teamLeader: '',
      teamMembers: []})
    this.subChatStep = '';
    this.sendMessage(true, 'Adicionar novo time');
    this.sendMessage(false, 'Preencha o formulário abaixo para adicionar um time');
    this.chatStep = 'addTeam'
  }

  onEditUser(user: any) {
    this.idFormUser = user.id;
    this.userForm.patchValue(user);
    this.sendMessage(false, `Preencha o formulário abaixo para editar <b>${user.name}</b>`);
    this.chatStep = 'addUser';
  }

  sendMessage(user: boolean, msg?: string, data?: any) {
    if (this.newMessage.trim() || msg) {
      this.messages.push({ text: msg ?? this.newMessage, user, type: 'message' });
      this.newMessage = '';

      if (user) {
        switch (msg) {
          case 'Verificar usuários':
            this.messages.push({ text: '', user: false, type: 'userVerify' });
          break;
  
          case 'Adicionar usuário':
            this.onAddUser();
          break;
  
          case 'Editar usuário':
            this.onEditUser(data);
          break;

          case 'Verificar times':
            this.messages.push({ text: '', user: false, type: 'teamVerify' });
          break;

          case 'Mapa estratégico':
            this.messages.push({ text: '', user: false, type: 'okrListVerify' });
          break;
      
        default:
          break;
        }
      }

      setTimeout(() => {
        this.scrollToBottom();
      }, 10);
     }
  }

  addUserFromForm(form: any) {
    if (this.idFormUser.length) {
      this.fsService.updateItem(this.idFormUser, form, 'Users').then(() => {
        this.chatStep = 'showMenu';
        this.toastService.create({message: 'Usuário adicionado com sucesso', duration: 3000, position: 'middle'})
      }).catch(() => {
        this.toastService.create({message: 'Tivemos um problema ao adicionar o usuário', duration: 3000, position: 'middle'})
      });
    }else {
      this.fsService.addItem(form, 'Users').then(() => {
        this.chatStep = 'showMenu';
        this.toastService.create({message: 'Usuário adicionado com sucesso', duration: 3000, position: 'middle'})
      }).catch(() => {
        this.toastService.create({message: 'Tivemos um problema ao adicionar o usuário', duration: 3000, position: 'middle'})
      });
    }
    
  }

  backMenu() {
    this.chatStep = 'showMenu';
    this.userForm.patchValue({
      email: '',
      name: '',
    jobTitle: '',
    role: 'User',
    status: [false]})
  }

  async openModalStrategicMap() {
    console.log("open modal ")
    const modal = await this.modalCtrl.create({
      component: StrategicMapComponent,
      cssClass: 'modal-strategic'
    });
    modal.present();
  }

  scrollToBottom() {
    const element = this.chatMessages?.nativeElement;
    const start = element.scrollTop;
    const end = element.scrollHeight - element.clientHeight;
    const duration = 500; // Duração da animação em milissegundos
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      element.scrollTop = start + (end - start) * easeInOutQuad(progress);

      if (timeElapsed < duration) {
        window.requestAnimationFrame(animateScroll);
      }
    };

    const easeInOutQuad = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    window.requestAnimationFrame(animateScroll);
  }
  
}

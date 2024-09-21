import { Component, OnInit } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-invited',
  templateUrl: './invited.component.html',
  styleUrls: ['./invited.component.scss'],
})
export class InvitedComponent  implements OnInit {

  loginForm: FormGroup;
  hash: string | null = '';
  userData: any;

  constructor(private fb: FormBuilder, private activateRoute: ActivatedRoute, private fsService: FirebaseService, private navCtrl: NavController, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      this.hash = params?.get('hash') ?? '';
      // Agora você pode usar o hash como precisar
      console.log(this.hash);
      this.fsService.getItem(this.hash, 'PossibleNewUsers').pipe(take(1)).subscribe(
        usuarioData => {
          console.log("usuariodata ", usuarioData);
          this.userData = usuarioData;
        }
      )
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Email:', email);
      console.log('Password:', password);
      // Lógica de autenticação aqui
    }
  }

  signInWithGoogle() {
    this.authService.byGoogle().then((user: UserCredential) => {
      user.user.uid;
      this.fsService.addItemWithId(this.userData, 'Users', user.user.uid)

      this.navCtrl.navigateRoot('home');
    });
  }
}

import { Injectable, inject } from '@angular/core';
import { ActionCodeSettings, Auth, GoogleAuthProvider, UserCredential, sendSignInLinkToEmail, signInWithEmailLink, signInWithPopup } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth = inject(Auth);
  
  constructor() { }

  byGoogle(): Promise<UserCredential> {
    return signInWithPopup(this._auth, new GoogleAuthProvider());
  }

  async byRegisterNewEmail(email: string) {
    console.log("email ", email)
    const actions: ActionCodeSettings = {
      url: 'https://www.medvibe.app'
    }
    return await sendSignInLinkToEmail(this._auth, email, actions);
  }
}

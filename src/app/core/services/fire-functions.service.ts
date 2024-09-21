import { Injectable, inject } from '@angular/core';
import { Functions } from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class FireFunctionsService {

  private functions = inject(Functions);
  
  constructor() { }

  sendEmail() {
    
  }
}

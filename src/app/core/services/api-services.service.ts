import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {
  private apiUrl = 'https://us-central1-okrproject-92b70.cloudfunctions.net/sendEmail'; // URL da sua rota

  constructor(private http: HttpClient) { }

  sendEmail(to: string, subject: string, name: string, url: string): Observable<any> {
    const emailData = { to, subject, name, url };
    return this.http.post(this.apiUrl, emailData);
  }
}

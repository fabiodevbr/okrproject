import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { TeamsComponent } from './pages/teams/teams.component';
import { OkrChatComponent } from './pages/okr-chat/okr-chat.component';
import { SharedModule } from './shared/shared.module';
import { StrategicMapComponent } from './pages/strategic-map/strategic-map.component';
import { OkrCardComponent } from './shared/okr-card/okr-card.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CompanyComponent } from './pages/company/company.component';
import { HttpClientModule } from '@angular/common/http';
import { provideFunctions, getFunctions } from '@angular/fire/functions';

@NgModule({
  declarations: [AppComponent, LoginComponent,CompanyComponent, TeamsComponent, OkrChatComponent, OkrCardComponent, StrategicMapComponent],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule, GridModule, SharedModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule {}

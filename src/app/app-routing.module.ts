import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CompanyComponent } from './pages/company/company.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { UsersComponent } from './pages/users/users.component';
import { OkrChatComponent } from './pages/okr-chat/okr-chat.component';
import { StrategicMapComponent } from './pages/strategic-map/strategic-map.component';
import { InvitedComponent } from './auth/invited/invited.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: LoginComponent
  },
  {
    path: 'invited/:hash',
    component: InvitedComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'companies',
    component: CompanyComponent
  },
  {
    path: 'teams',
    component: TeamsComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'okrchat',
    component: OkrChatComponent
  },
  {
    path: 'strategic-map',
    component: StrategicMapComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

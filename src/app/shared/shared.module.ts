import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormAddTeamComponent } from './form-add-team/form-add-team.component';
import { FormAddUserComponent } from './form-add-user/form-add-user.component';
import { CardListTeamComponent } from './card-list-team/card-list-team.component';
import { CardListUserComponent } from './card-list-user/card-list-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListMenuComponent } from './list-menu/list-menu.component';
import { CardListOkrComponent } from './card-list-okr/card-list-okr.component';
import { FormAddOkrComponent } from './form-add-okr/form-add-okr.component';



@NgModule({
  declarations: [FormAddTeamComponent, FormAddOkrComponent, CardListOkrComponent, ListMenuComponent, FormAddUserComponent, CardListTeamComponent, CardListUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FormAddTeamComponent, FormAddUserComponent, FormAddOkrComponent, CardListOkrComponent, ListMenuComponent,CardListTeamComponent, CardListUserComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule { }

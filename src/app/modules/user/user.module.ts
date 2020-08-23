import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentsDetailComponent } from './students-detail/students-detail.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [StudentsDetailComponent, StudentsListComponent],
  imports: [
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }

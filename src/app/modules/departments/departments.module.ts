import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsListComponent } from './departments-list/departments-list.component';
import { DepartmentsDetailComponent } from './departments-detail/departments-detail.component';
import { DepartmentModalComponent } from './department-modal/department-modal.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [DepartmentsListComponent, DepartmentsDetailComponent, DepartmentModalComponent],
  imports: [
    SharedModule,
    DepartmentsRoutingModule
  ]
})
export class DepartmentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { JobModalComponent } from './job-modal/job-modal.component';



@NgModule({
  declarations: [JobsListComponent, JobModalComponent],
  imports: [
    SharedModule,
    JobsRoutingModule
  ]
})
export class JobsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OportunitiesRoutingModule } from './oportunities-routing.module';
import { OportunitiesListComponent } from './oportunities-list/oportunities-list.component';
import { OportunitiesDetailComponent } from './oportunities-detail/oportunities-detail.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [OportunitiesListComponent, OportunitiesDetailComponent],
  imports: [
    SharedModule,
    OportunitiesRoutingModule
  ]
})
export class OportunitiesModule { }

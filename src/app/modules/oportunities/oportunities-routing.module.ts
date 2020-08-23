import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OportunitiesListComponent } from './oportunities-list/oportunities-list.component';
import { OportunitiesDetailComponent } from './oportunities-detail/oportunities-detail.component';

const routes: Routes =  [
  {
    path: '',
    component: OportunitiesListComponent,
  },
  {
    path: ':oportunityId',
    component: OportunitiesDetailComponent,
  },
  {
    path: '/new/',
    component: OportunitiesDetailComponent,
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OportunitiesRoutingModule { }

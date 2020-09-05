import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OportunitiesListComponent } from './oportunities-list/oportunities-list.component';
import { OportunitiesDetailComponent } from './oportunities-detail/oportunities-detail.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { PermissionGuard } from '../../core/guards/permission.guard';


const routes: Routes =  [
  {
    path: '',
    component: OportunitiesListComponent,
  },
  {
    path: ':status',
    component: OportunitiesListComponent,
  },
  {
    path: 'details/:oportunityId',
    component: OportunitiesDetailComponent,
  },
  {
    path: 'details/new',
    component: OportunitiesDetailComponent,
  },
  {
    path: 'details/closed',
    canLoad: [AuthGuard,PermissionGuard],
    data: { roleNeeded: 'Admin' },
    component: OportunitiesDetailComponent,
  }
 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OportunitiesRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoggedGuard } from './core/guards/logged.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { PermissionGuard } from './core/guards/permission.guard';


const routes: Routes = [
  {
    path: '',
    canActivate: [LoggedGuard],
    loadChildren: (): Promise<any> =>
      import('./modules/authentication/authentication.module').then(
        (module) => module.AuthenticationModule
      ),
  },
  {
    path: 'dashboard',
    canLoad: [AuthGuard],
    loadChildren: (): Promise<any> =>
      import('./modules/dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      ),
  },
  {
    path: 'departments',
    canLoad: [AuthGuard,PermissionGuard],
    data: { roleNeeded: 'Admin' },
    loadChildren: (): Promise<any> =>
      import('./modules/departments/departments.module').then(
        (module) => module.DepartmentsModule
      ),
  },
  {
    path: 'jobs',
    canLoad: [AuthGuard,PermissionGuard],
    data: { roleNeeded: 'Admin' },
    loadChildren: (): Promise<any> =>
      import('./modules/jobs/jobs.module').then(
        (module) => module.JobsModule
      ),
  },
  {
    path: 'oportunities',
    canLoad: [AuthGuard],
    loadChildren: (): Promise<any> =>
      import('./modules/oportunities/oportunities.module').then(
        (module) => module.OportunitiesModule
      ),
  },
  {
    path: 'user',
    canLoad: [AuthGuard],
    loadChildren: (): Promise<any> =>
      import('./modules/user/user.module').then(
        (module) => module.UserModule
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

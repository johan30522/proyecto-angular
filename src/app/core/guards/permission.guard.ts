import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanLoad {
  constructor(private readonly authenticationService: AuthenticationService) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    const currentRole = this.authenticationService.getLoggedUser().role;

    if (currentRole === route.data.roleNeeded) {
      return true;
    }

    return false;
  }
}

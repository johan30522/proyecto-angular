import { Injectable } from '@angular/core';
import { SecurityService } from '../../data-services/security/security.service';
import { UserService } from './../../data-services/users/user.service';
import { EventsHubService } from '../events-hub/events-hub.service';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: string;
  private loggedUser;

  constructor(
    private readonly securityService: SecurityService,
    private readonly userService: UserService,
    private readonly eventsHubService: EventsHubService,
    private readonly localStorageService:LocalStorageService,
    private router:Router
  ) {
    const authData = this.localStorageService.get('authData', null);
    if (authData) {
      this.token = authData.token;
      this.loggedUser = authData.loggedUser;
      this.eventsHubService.setLoggedIn(true);
    }
  }

  public login(credentials): Promise<any> {
    return new Promise((resolve, reject) => {
      this.securityService.login(credentials).subscribe(
        (result) => {
          this.token = result.token;
          console.log(`token: ${this.token}`);
          //console.log(result);
          const userId = result.userId;

          this.userService.getUser(userId).subscribe(
            (user) => {
              console.log('usuario encontrado:');
              console.log(user);
              this.loggedUser = user;
              this.eventsHubService.setLoggedIn(true);

              this.localStorageService.set('authData', {
                token: this.token,
                loggedUser: this.loggedUser,
              });

              resolve(result);
            },
            () => {
              reject({ message: 'user does not exists' });
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public getToken(): string {
    return this.token;
  }

  public getLoggedUser(): any {
    return this.loggedUser;
  }

  public isLoggedIn(): boolean {
    return this.eventsHubService.loggedIn$.getValue();
  }
  public logout(): void {
    // API call for logout if exist then clean the localstorage
    this.securityService.logout();
    this.localStorageService.deleteAll();
    this.loggedUser=null;
    this.eventsHubService.setLoggedIn(false);
    this.router.navigate(['/']);
  }
}

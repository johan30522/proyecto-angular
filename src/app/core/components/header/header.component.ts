import { Component, OnInit } from '@angular/core';
import { EventsHubService } from '../../services/events-hub/events-hub.service';
import { faUser,faDoorClosed,faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { PermissionsService } from '../../services/permissions/permissions.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
@Component({
  selector: 'reclutamiento-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  show: boolean = false;
  fauser=faUser;
  faLogout=faSignOutAlt;
  public user;
  public userName:string;

  public isLoggedIn: boolean;
  constructor(
    private evenstHubService: EventsHubService,
    public permissionsService: PermissionsService,
    private authenticationService:AuthenticationService

    ) { }

  ngOnInit(): void {
    
    this.isLoggedIn = false;
    this.getUser();

    this.evenstHubService.loggedIn$.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }
  private getUser(): void{
    this.user = this.authenticationService.getLoggedUser();
    this.userName=this.user.username;
  }
  public logout(): void {

    this.authenticationService.logout();
  }

}

import { Component, OnInit } from '@angular/core';
import { EventsHubService } from '../../services/events-hub/events-hub.service';
import { faUser,faDoorClosed,faSignOutAlt,faUpload} from '@fortawesome/free-solid-svg-icons';
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
  faupload=faUpload;
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
    
    console.log(`Usuario:${this.userName}`);
    this.evenstHubService.loggedIn$.subscribe((value) => {
      this.isLoggedIn = value;
      if(this.isLoggedIn){
        this.getUser();
      }
    });
  }
  private getUser(): void{
    this.user = this.authenticationService.getLoggedUser();
    console.log('usuario logueado:');
    console.log(this.user);
    this.userName=this.user.username;
    

  }
  public logout(): void {

    this.authenticationService.logout();
  }

}

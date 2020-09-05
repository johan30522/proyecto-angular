import { Component, OnInit } from '@angular/core';
import { Oportunity } from '../../../shared/models/oportunity';
import { ToastrService } from 'ngx-toastr';
import { OportunitiesService } from '../../../core/data-services/oportunities/oportunities.service';
import { faFile, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { JobsService } from '../../../core/data-services/jobs/jobs.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionsService } from '../../../core/services/permissions/permissions.service';


import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { Enroll_Opportunity } from '../../../shared/models/enrollment.opportunity.model';
import { UserProfile } from '../../../shared/models/user.profile.model';
import { UserProfileService } from '../../../core/data-services/users/user-profile.service';
import { Enroll_User } from '../../../shared/models/enrollment.user.model';
import { EnrollmentUserService } from '../../../core/data-services/enrollments/enrollment-user.service';

@Component({
  selector: 'reclutamiento-oportunities-list',
  templateUrl: './oportunities-list.component.html',
  styleUrls: ['./oportunities-list.component.scss']
})
export class OportunitiesListComponent implements OnInit {

  public list: Oportunity[];
  fanew = faFile;
  famulti = faCheckSquare;
  public statusOpp:string;
  private userProfile:UserProfile;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private readonly oportunityService: OportunitiesService,
    private readonly jobService: JobsService,
    public permissionsService: PermissionsService,
    private authenticationService:AuthenticationService,
    private userProfileService:UserProfileService,
    private enrollmentUserService:EnrollmentUserService

  ) { }

  ngOnInit(): void {
    this.statusOpp=this.activatedRoute.snapshot.params['status'];
    console.log(`el estado es: ${this.statusOpp}`);
    this.getListOportunities(this.statusOpp);
    this.getUserProfile();

  }

  private getListOportunities(status:string): void {
    this.oportunityService.getOportunitiesByStatus(status).subscribe(
      (result: Oportunity[]) => {
        this.list = result;
      },
      (error) => {
        console.error(error);
      }
    )
  }
  public changeStatusOPP(oportunity: Oportunity): void {
    
    let statusstr:string;
    if(oportunity.status==='Closed'){
      statusstr='Open'
    }else{
      statusstr='Closed'
    }
    this.oportunityService.changeStatus(oportunity.id, statusstr).subscribe(() => {
      this.toastr.info(' Se ha cambiado el estado a la Oportunidad');
      this.getListOportunities(this.statusOpp);
    },
      (error) => {
        console.error(error);
      });
  }

  public applyOportunity(oportunity: Oportunity): void {

    let enrollment:Enroll_User=new Enroll_User();
    enrollment.idUser=oportunity.id;
    enrollment.idOpportunity=this.userProfile.id;
  
    this.enrollmentUserService.createEnrollmentUser(enrollment).subscribe(()=>{
  
        this.toastr.info(' Gracias por aplicar a la Oportunidad!!');
      },
        (error) => {
          console.error(error);
  
    })

  }


  private getUserProfile(): void {
    //this.user = this.authenticationService.getLoggedUser();
    let user:UserProfile;
    this.userProfileService.getUserProfile(this.authenticationService.getLoggedUser().id).subscribe((result) => {
      this.userProfile=result;

    },
      (error) => {
          this.toastr.error(error);
        }
    )
  }

  public inactiveOportunity(): void {
    this.list.forEach((item) => {
      //item.active = false;
    });
  }
  public TestConfirm():void{
 
  }
}

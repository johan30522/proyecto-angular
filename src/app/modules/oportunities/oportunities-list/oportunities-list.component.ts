import { Component, OnInit } from '@angular/core';
import { Oportunity } from '../../../shared/models/oportunity';
import { ToastrService } from 'ngx-toastr';
import { OportunitiesService } from '../../../core/data-services/oportunities/oportunities.service';
import { faFile, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { JobsService } from '../../../core/data-services/jobs/jobs.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionsService } from '../../../core/services/permissions/permissions.service';

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

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private readonly oportunityService: OportunitiesService,
    private readonly jobService: JobsService,
    public permissionsService: PermissionsService

  ) { }

  ngOnInit(): void {
    this.statusOpp=this.activatedRoute.snapshot.params['status'];
    console.log(`el estado es: ${this.statusOpp}`);
    this.getListOportunities(this.statusOpp);

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
  public showOportunityInformation(oportunity: Oportunity): void {
    
    let statusstr:string;
    if(oportunity.status==='Closed'){
      statusstr='Open'
    }else{
      statusstr='Closed'
    }
    this.oportunityService.changeStatus(oportunity.id, statusstr).subscribe(() => {
      this.getListOportunities(this.statusOpp);
    },
      (error) => {
        console.error(error);
      });
  }

  public inactiveOportunity(): void {
    this.list.forEach((item) => {
      //item.active = false;
    });
  }
  public TestConfirm():void{
 
  }
}

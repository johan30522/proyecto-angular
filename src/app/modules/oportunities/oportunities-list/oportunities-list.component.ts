import { Component, OnInit } from '@angular/core';
import { Oportunity } from '../../../shared/models/oportunity';
import { ToastrService } from 'ngx-toastr';
import { OportunitiesService } from '../../../core/data-services/oportunities/oportunities.service';
import { faFile,faCheckSquare} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'reclutamiento-oportunities-list',
  templateUrl: './oportunities-list.component.html',
  styleUrls: ['./oportunities-list.component.scss']
})
export class OportunitiesListComponent implements OnInit {

  public list: Oportunity[];
  fanew=faFile;
  famulti=faCheckSquare;

  constructor(
    private toastr: ToastrService,
    private readonly oportunityService:OportunitiesService

  ) { }

  ngOnInit(): void {
    this.getListOportunities();
    console.log(this.list);
  }
  private getListOportunities(): void {
    this.oportunityService.getOportunities().subscribe(
      (result:Oportunity[])=>{
        this.list = result;
      },
      (error)=>{
        console.error(error);
      }
    )
  }
    public showOportunityInformation(oportunity:Oportunity):void{
      console.log(oportunity);
    }
    public inactiveOportunity(): void {
      this.list.forEach((item) => {
        //item.active = false;
      });
    }
}

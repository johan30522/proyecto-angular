import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OportunitiesService } from '../../../core/data-services/oportunities/oportunities.service';
import { Oportunity } from '../../../shared/models/oportunity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'reclutamiento-oportunities-detail',
  templateUrl: './oportunities-detail.component.html',
  styleUrls: ['./oportunities-detail.component.scss']
})
export class OportunitiesDetailComponent implements OnInit {
  public errorMsg: string = '';
  public submitted: boolean;
  public oportunity:Oportunity;

  public form: FormGroup;

  constructor(
    private readonly activatedRoute:ActivatedRoute,
    private readonly opportunitiesService:OportunitiesService,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.getOportunityID();
    this.initForm();
  }
  private initForm(): void {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      creationDate: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      requiredSkills: [null, [Validators.required]],
      consideredSkills: [null, [Validators.required]],
      job: [null, [Validators.required]],
    });

  }
  public getOportunityID():void{
    /*this.activatedRoute.params.subscribe((params)=>{
      this.oppId=+params['oportunityId'];
      console.log(`opp id: ${this.oppId}`);
    })*/
    const oppId:number=+this.activatedRoute.snapshot.params['oportunityId'];
    this.getOportunityDetail(oppId);
  }
  private getOportunityDetail(oppID:number):void{
    this.opportunitiesService.getOportunity(oppID).subscribe(
      (oportunity)=>{
        this.oportunity=oportunity;
      }
    )

  }
  public save() {
    console.log('submited form');
    this.submitted = true;
    this.errorMsg = '';
    console.log(this.form.value);
    if (!this.form.valid) {

      return;
    }
    console.log(this.form.value);

   
  }

}

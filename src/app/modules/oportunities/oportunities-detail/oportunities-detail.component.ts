import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OportunitiesService } from '../../../core/data-services/oportunities/oportunities.service';
import { Oportunity } from '../../../shared/models/oportunity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from '../../../shared/models/jobs.model';
import { JobsService } from '../../../core/data-services/jobs/jobs.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'reclutamiento-oportunities-detail',
  templateUrl: './oportunities-detail.component.html',
  styleUrls: ['./oportunities-detail.component.scss']
})
export class OportunitiesDetailComponent implements OnInit {
  public errorMsg: string = '';
  public submitted: boolean;
  public oportunity: Oportunity;
  private isEditMode: boolean;
  public listJobs:Job[];

  public form: FormGroup;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly opportunitiesService: OportunitiesService,
    private readonly jobService:JobsService,
    private formBuilder: FormBuilder,
    private toastr:ToastrService,
    private readonly router: Router

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
    }
    );
    this.loadJobs();
  }
  private patchValueForm(): void {
    console.log('patchValue');
    console.log(this.oportunity);
    this.form.patchValue(this.oportunity)

  }

  public getOportunityID(): void {
    /*this.activatedRoute.params.subscribe((params)=>{
      this.oppId=+params['oportunityId'];
      console.log(`opp id: ${this.oppId}`);
    })*/
    const oppId: number = +this.activatedRoute.snapshot.params['oportunityId'];
    if (isNaN(oppId)) {
      this.isEditMode = false;
    } else {
      this.isEditMode = true;
      this.getOportunityDetail(oppId);
    }

  }
  private getOportunityDetail(oppID: number): void {
    this.opportunitiesService.getOportunity(oppID).subscribe(
      (oportunity) => {
        this.oportunity = oportunity;
        this.patchValueForm();
      }
    )

  }
  private loadJobs():void{
    this.jobService.getJobs().subscribe(
      (result)=>{
        this.listJobs=result;
      },
      (error)=>{
        this.toastr.error(error);
      }
    );
  }
  public save() {
    console.log('submited form');
    this.submitted = true;
    this.errorMsg = '';
    //console.log(this.form.value);
    if (!this.form.valid) {
      return;
    }
    let oppEdit:Oportunity;
    if (this.isEditMode) {
      oppEdit=this.form.value
      oppEdit.id=this.oportunity.id;
      this.opportunitiesService.editOportunuity(oppEdit).subscribe(
        ()=>{
          this.toastr.success('Opportunity Updated');
          this.router.navigateByUrl('/oportunities');
        }
      )
    }else{
      this.jobService.getJob(this.form.value.job).subscribe((result)=>{
        let job:Job=result;
        oppEdit=this.form.value;
        oppEdit.job=job;
        this.opportunitiesService.createOportunity(oppEdit).subscribe(
          ()=>{
            this.toastr.success('Opportunity Created');
            this.router.navigateByUrl('/oportunities');
          }
        )
      })
     console.log(oppEdit);
    }

  }

}

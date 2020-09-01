import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OportunitiesService } from '../../../core/data-services/oportunities/oportunities.service';
import { Oportunity } from '../../../shared/models/oportunity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job } from '../../../shared/models/jobs.model';
import { JobsService } from '../../../core/data-services/jobs/jobs.service';
import { ToastrService } from 'ngx-toastr';
import { faDoorOpen, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { PermissionsService } from '../../../core/services/permissions/permissions.service';
import { EnrollmentOpportunityService } from '../../../core/data-services/enrollments/enrollment-opportunity.service';
import { Enroll_Opportunity } from '../../../shared/models/enrollment.opportunity.model';
import { UserProfile } from '../../../shared/models/user.profile.model';
import { AbstractForm } from '../../../shared/components/abstract/abstract-form';




@Component({
  selector: 'reclutamiento-oportunities-detail',
  templateUrl: './oportunities-detail.component.html',
  styleUrls: ['./oportunities-detail.component.scss']
})
export class OportunitiesDetailComponent extends AbstractForm implements OnInit {
  public errorMsg: string = '';
  public submitted: boolean;
  public oportunity: Oportunity;
  private isEditMode: boolean;
  public listJobs: Job[];
  public listEnrollments:UserProfile[];

  
  public active = 1;
  faDorOpen = faDoorOpen;

  faarrow = faArrowCircleLeft;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly opportunitiesService: OportunitiesService,
    private readonly jobService: JobsService,
    private readonly enrollmentOpportunityService:EnrollmentOpportunityService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private readonly router: Router,
    public permissionsService: PermissionsService
 

  ) {
    super(formBuilder)
   }

  ngOnInit(): void {
    this.getOportunityID();
    this.initForm();

  }
  protected initForm(): void {
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
    this.form.patchValue(this.oportunity);
    this.form.patchValue({ job: this.oportunity.job.id.toString() });
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
      this.loadEnrollments(oppId);
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
  private loadJobs(): void {
    this.jobService.getJobs().subscribe(
      (result) => {
        this.listJobs = result;
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
  private loadEnrollments(oppId:number): void {
    this.enrollmentOpportunityService.getEnrollmentOpp(oppId).subscribe(
      (result) => {
        this.listEnrollments = result.user;
        console.log(this.listEnrollments);
      }
    );
  }
  public save() {
    this.submitAttempt = true;
    console.log('submited form');
    this.submitted = true;
    this.errorMsg = '';
    if (!this.form.valid) {
      console.log('no pasa validacion');
      return;
    }
    let oppEdit: Oportunity;
    let job: Job;
    console.log(this.form.value);



    this.jobService.getJob(this.form.value.job).subscribe((result) => {
      job = result;
      oppEdit = this.form.value
      oppEdit.job=job;
      
      if (this.isEditMode) {
     
        oppEdit.id = this.oportunity.id;
        this.opportunitiesService.editOportunuity(oppEdit).subscribe(
          () => {
            this.toastr.success('Opportunity Updated');
            this.router.navigateByUrl('/oportunities/open');
          },
          (error) => {
            this.toastr.error(error);
          }
        )
      } else {
        this.opportunitiesService.createOportunity(oppEdit).subscribe(
          () => {
            this.toastr.success('Opportunity Created');
            this.router.navigateByUrl('/oportunities/open');
          },
          (error) => {
            this.toastr.error(error);
          }
        )
      }
    })
  }

}

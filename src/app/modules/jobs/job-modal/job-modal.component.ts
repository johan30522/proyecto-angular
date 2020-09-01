import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from '../../../core/data-services/jobs/jobs.service';
import { DepartmentsService } from '../../../core/data-services/departments/departments.service';
import { Department } from '../../../shared/models/department.model';
import { Job } from '../../../shared/models/jobs.model';
import { AbstractForm } from '../../../shared/components/abstract/abstract-form';


@Component({
  selector: 'reclutamiento-job-modal',
  templateUrl: './job-modal.component.html',
  styleUrls: ['./job-modal.component.scss']
})
export class JobModalComponent extends AbstractForm implements OnInit {
  @Input() public job: Job;
  public listDeptos:Department[];
  @Output()
  public readonly successfulTransaction = new EventEmitter<boolean>();
  

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private readonly jobService: JobsService,
    private readonly departmentsService:DepartmentsService

  ) {
    super(formBuilder);
   }
  ngOnInit(): void {
    this.initForm();
  }
  public isEditMode(): boolean {
    return !!this.job?.id;
  }
  protected initForm(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      department: [null, [Validators.required]]
    });
    this.loadDeptos();
    if (this.isEditMode()) {
      this.form.patchValue(this.job);
      this.form.patchValue({ department: this.job.department.id.toString() });
    }

  }
  public closeModal(): void {
    this.modalService.dismissAll();
  }
  private loadDeptos(): void{
    this.departmentsService.getDeptos().subscribe(
      (result)=>{
        this.listDeptos=result;
      },
      (error)=>{
        this.toastr.error(error);
      }
    );
  }
  public createJob(){
    this.submitAttempt = true;
    if (!this.form.valid) {
      //this.toastr.error('there are errors in the form');
      return;
    }

    this.departmentsService.getDepto(this.form.value.department).subscribe(
      (result)=>{

        let depto:Department=result;
        this.form.value.department=depto;

        const action = this.isEditMode()
        ? this.jobService.editJob({...this.form.value, id: this.job.id})
        : this.jobService.createJob(this.form.value);

        action.subscribe(() => {
          const message = this.isEditMode() ? 'Job Edited Successfully' : 'Job Created Successfully'
          this.toastr.success(message);
          this.successfulTransaction.emit(true);
          this.closeModal();
        });

      },
      (error)=>{
        this.toastr.error(error);
      }
    );

    
  }
}

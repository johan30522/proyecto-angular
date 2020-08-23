import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from '../../../core/data-services/jobs/jobs.service';
import { DepartmentsService } from '../../../core/data-services/departments/departments.service';
import { Department } from '../../../shared/models/department.model';
import { Job } from '../../../shared/models/jobs.model';

@Component({
  selector: 'reclutamiento-job-modal',
  templateUrl: './job-modal.component.html',
  styleUrls: ['./job-modal.component.scss']
})
export class JobModalComponent implements OnInit {
  public listDeptos:Department[];
  @Output()
  public readonly successfulTransaction = new EventEmitter<boolean>();
  public form: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private readonly jobService: JobsService,
    private readonly departmentsService:DepartmentsService

  ) { }
  ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      department: [null, [Validators.required]]
    });
    this.loadDeptos();
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

    if (!this.form.valid) {
      this.toastr.error('there are errors in the form');
    }
    this.departmentsService.getDepto(this.form.value.department).subscribe(
      (result)=>{
        let depto:Department=result;
        this.form.value.department=depto;
        this.jobService.createJob(this.form.value).subscribe(() => {
          this.toastr.success('Course Created');
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

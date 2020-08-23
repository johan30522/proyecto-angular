import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from '../../../core/data-services/departments/departments.service';
import { Department } from 'src/app/shared/models/department.model';
import { AbstractForm } from '../../../shared/components/abstract/abstract-form';


@Component({
  selector: 'reclutamiento-department-modal',
  templateUrl: './department-modal.component.html',
  styleUrls: ['./department-modal.component.scss']
})
export class DepartmentModalComponent extends AbstractForm implements OnInit {

  @Output()
  public readonly successfulTransaction = new EventEmitter<boolean>();

  public form: FormGroup;
  constructor(
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private readonly departmentsService: DepartmentsService
  ) {
    super(formBuilder);
  }
  ngOnInit(): void {
    this.initForm();
  }

  protected initForm(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
  }
  public closeModal(): void {
    this.modalService.dismissAll();
  }
public createDepto(){
  this.submitAttempt = true;
  if (!this.form.valid) {
    return;
  }
 this.departmentsService.createDepartment(this.form.value).subscribe(() => {
    this.toastr.success('Course Created');
    this.successfulTransaction.emit(true);
    this.closeModal();
  });
  
}
}

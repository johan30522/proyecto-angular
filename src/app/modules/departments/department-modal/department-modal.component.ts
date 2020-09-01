import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() public department: Department;
  @Output()
  public readonly successfulTransaction = new EventEmitter<boolean>();

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
  public isEditMode(): boolean {
    return !!this.department?.id;
  }
  protected initForm(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
    if (this.isEditMode()) {
      this.form.patchValue(this.department);
    }

  }
  public closeModal(): void {
    this.modalService.dismissAll();
  }
public createDepto(){
  this.submitAttempt = true;
  if (!this.form.valid) {
    return;
  }

  const action = this.isEditMode()
  ? this.departmentsService.editDepartment({...this.form.value, id: this.department.id})
  : this.departmentsService.createDepartment(this.form.value);


  action.subscribe(() => {
    const message = this.isEditMode() ? 'Department Edited Successfully' : 'Department Created Successfully'
    this.toastr.success(message);
    this.successfulTransaction.emit(true);
    this.closeModal();
  });
  
}
}

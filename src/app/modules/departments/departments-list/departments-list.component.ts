import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../../../core/data-services/departments/departments.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from '../../../shared/models/department.model';
import { DepartmentModalComponent } from '../department-modal/department-modal.component';

@Component({
  selector: 'reclutamiento-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.scss']
})
export class DepartmentsListComponent implements OnInit {
  public list: Department[];
  constructor(
    private readonly deptoService: DepartmentsService,
    private readonly toastr: ToastrService,
    private readonly modalService: NgbModal
  ) { }
  ngOnInit(): void {
    this.loadDeptos();
  }
  private loadDeptos(): void {
    this.deptoService.getDeptos().subscribe(
      (result) => {
        this.list = result;
        console.log(this.list);
      },
      (error) => {
        this.toastr.error(error);
      }
    );
  }
  public deleteDepto(depto: Department): void {
    this.deptoService.deletDepartment(depto.id).subscribe(() => {
      this.toastr.success('Depto Deleted successfully');
      this.loadDeptos();
    });
  }
  public createDepto():void{
    const modalRef = this.modalService.open(DepartmentModalComponent, {
      size: 'md',
      centered: true
    });
    modalRef.componentInstance.successfulTransaction.subscribe(() => {
      this.loadDeptos();
    });

  }
  public editDepto(depto: Department): void {
    const modalRef = this.modalService.open(DepartmentModalComponent, {
      size: 'md',
      centered: true,
    });

    modalRef.componentInstance.department = depto;

    modalRef.componentInstance.successfulTransaction.subscribe(() => {
      this.loadDeptos();
    });
  }
}

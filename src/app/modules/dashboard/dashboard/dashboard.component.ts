import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../../../core/services/calculator.service';

import { ToastrService } from 'ngx-toastr';
import { StudentsService } from '../../../core/data-services/student/student.service';
import { Student } from 'src/app/shared/models/student.model';

 

@Component({
  selector: 'reclutamiento-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public list: Student[];
  public visible: boolean;

  constructor(
    private readonly calculator: CalculatorService,
    private toastr: ToastrService,
    private readonly studentService:StudentsService) {}

  ngOnInit(): void {
    console.log(this.calculator.sum(5, 50));
    this.visible = false;
    this.getList();
    console.log(this.list);
  }

  private getList(): void {
    this.studentService.getStudents().subscribe(
      (result:Student[])=>{
        this.list = result;
      },
      (error)=>{
        console.error(error);
      }
    );
  }

  public toggleVisible() {
    this.visible = !this.visible;
  }
  public getLisNombrest() {
    return this.list;
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }




}

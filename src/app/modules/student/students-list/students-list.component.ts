import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Student } from '../../../shared/models/student.model';
import { CalculatorService } from 'src/app/core/services/calculator.service';
import { ToastrService } from 'ngx-toastr';
import { StudentsService } from '../../../core/data-services/student/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'reclutamiento-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  public list: Student[];
  public visible: boolean;


  constructor(
    private readonly calculator: CalculatorService,
    private toastr: ToastrService,
    private readonly studentService:StudentsService

  ) { }

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
  showSuccess2() {
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
  }
  public showStudenInformation(student:Student):void{
    console.log(student);
  }
  public inactiveStudents(): void {
    this.list.forEach((item) => {
      item.active = false;
    });
  }

}

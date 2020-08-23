import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { Student } from '../../models/student.model';

@Component({
  selector: 'reclutamiento-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent implements OnInit, OnChanges,OnDestroy {
  @Input() student:Student;
  
  @Output() onStudentSelected = new EventEmitter<Student>();

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges():void{

  }
  ngOnDestroy():void{
    
  }
public studentSelect(student:Student):void{
  //console.log(student);
  this.onStudentSelected.emit(student);
}
}

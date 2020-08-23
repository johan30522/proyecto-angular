import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Oportunity } from '../../models/oportunity';
import { faPen,faArrowCircleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'reclutamiento-oportunity-card',
  templateUrl: './oportunity-card.component.html',
  styleUrls: ['./oportunity-card.component.scss']
})
export class OportunityCardComponent implements OnInit {
  @Input() oportunity:Oportunity;
  @Output() onOportunitySelected = new EventEmitter<Oportunity>();
  faPen=faPen;
  faDesactive=faArrowCircleRight;
  
  constructor() { }

  ngOnInit(): void {
  }
  public oportunitytSelect(oportunity:Oportunity):void{
    //console.log(student);
    this.onOportunitySelected.emit(oportunity);
  }
}

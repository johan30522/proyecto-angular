import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Oportunity } from '../../models/oportunity';
import { faPen,faArrowCircleRight,faDoorOpen,faCheck} from '@fortawesome/free-solid-svg-icons';
import { EventsHubService } from '../../../core/services/events-hub/events-hub.service';
import { PermissionsService } from '../../../core/services/permissions/permissions.service';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';

@Component({
  selector: 'reclutamiento-oportunity-card',
  templateUrl: './oportunity-card.component.html',
  styleUrls: ['./oportunity-card.component.scss']
})
export class OportunityCardComponent implements OnInit {
  @Input() oportunity:Oportunity;
  @Output() onOportunitySelected = new EventEmitter<Oportunity>();
  @Output() onOportunityApply = new EventEmitter<Oportunity>();
  faPen=faPen;
  faDesactive=faArrowCircleRight;
  faDoorOpen=faDoorOpen;
  faCheck=faCheck;
  constructor(
    private evenstHubService: EventsHubService,
    public permissionsService: PermissionsService,
    private authenticationService:AuthenticationService
  ) { }

  ngOnInit(): void {
  }
  public oportunitytSelect(oportunity:Oportunity):void{
    //console.log(student);
    this.onOportunitySelected.emit(oportunity);
  }
  public oportunityApply(oportunity:Oportunity):void{
    //console.log(student);
    this.onOportunityApply.emit(oportunity);
  }
}

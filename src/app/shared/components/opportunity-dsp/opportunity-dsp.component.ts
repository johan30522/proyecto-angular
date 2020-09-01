import { Component, OnInit, Input } from '@angular/core';
import { Oportunity } from '../../models/oportunity';
import { PermissionsService } from '../../../core/services/permissions/permissions.service';
import { faDoorOpen,faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'reclutamiento-opportunity-dsp',
  templateUrl: './opportunity-dsp.component.html',
  styleUrls: ['./opportunity-dsp.component.scss']
})
export class OpportunityDspComponent implements OnInit {
  @Input() oportunity:Oportunity;
  faDorOpen = faDoorOpen;
  faarrow = faArrowCircleLeft;
  constructor(
    public permissionsService: PermissionsService
  ) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { faDoorOpen,faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';
import { UserProfile } from '../../models/user.profile.model';
@Component({
  selector: 'reclutamiento-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() listUser:UserProfile[];
  faDorOpen=faDoorOpen;
  faarrow=faArrowCircleLeft;
  constructor() { }

  ngOnInit(): void {
  }

}

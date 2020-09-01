import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooleanTohumanPipe } from './pipes/booleanToHuman/boolean-tohuman.pipe';
import { AgePipe } from './pipes/age/age.pipe';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OportunityCardComponent } from './components/oportunity-card/oportunity-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompareDirective } from './directives/compare-directive/compare.directive';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { UserListComponent } from './components/user-list/user-list.component';
import { OpportunityDspComponent } from './components/opportunity-dsp/opportunity-dsp.component';


@NgModule({
  declarations: [BooleanTohumanPipe, AgePipe, OportunityCardComponent, CompareDirective, UserListComponent, OpportunityDspComponent],
  imports: [
    CommonModule,
    SweetAlert2Module,
    TranslateModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
    NgbModule,
    MomentModule
  ],
  exports: [
    CommonModule,
    BooleanTohumanPipe,
    AgePipe,
    TranslateModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    NgbModule,
    OportunityCardComponent,
    OpportunityDspComponent,
    UserListComponent,
    FontAwesomeModule,
    CompareDirective
  ]
})
export class SharedModule { }

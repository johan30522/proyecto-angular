import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityDspComponent } from './opportunity-dsp.component';

describe('OpportunityDspComponent', () => {
  let component: OpportunityDspComponent;
  let fixture: ComponentFixture<OpportunityDspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityDspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityDspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

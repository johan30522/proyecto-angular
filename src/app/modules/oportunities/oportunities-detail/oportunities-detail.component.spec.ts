import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OportunitiesDetailComponent } from './oportunities-detail.component';

describe('OportunitiesDetailComponent', () => {
  let component: OportunitiesDetailComponent;
  let fixture: ComponentFixture<OportunitiesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OportunitiesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OportunitiesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

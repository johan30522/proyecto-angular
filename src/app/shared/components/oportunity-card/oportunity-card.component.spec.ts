import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OportunityCardComponent } from './oportunity-card.component';

describe('OportunityCardComponent', () => {
  let component: OportunityCardComponent;
  let fixture: ComponentFixture<OportunityCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OportunityCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OportunityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

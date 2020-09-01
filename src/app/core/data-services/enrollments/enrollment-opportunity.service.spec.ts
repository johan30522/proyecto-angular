import { TestBed } from '@angular/core/testing';

import { EnrollmentOpportunityService } from './enrollment-opportunity.service';

describe('EnrollmentOpportunityService', () => {
  let service: EnrollmentOpportunityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrollmentOpportunityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

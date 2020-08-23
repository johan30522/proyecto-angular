import { TestBed } from '@angular/core/testing';

import { AvailableEmailService } from './available-email.service';

describe('AvailableEmailService', () => {
  let service: AvailableEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

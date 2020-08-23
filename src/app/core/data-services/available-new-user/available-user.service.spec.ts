import { TestBed } from '@angular/core/testing';

import { AvailableUserService } from './available-user.service';

describe('AvailableUserService', () => {
  let service: AvailableUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

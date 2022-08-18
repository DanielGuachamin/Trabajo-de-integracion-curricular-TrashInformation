import { TestBed } from '@angular/core/testing';

import { AdminVerificationGuard } from './admin-verification.guard';

describe('AdminVerificationGuard', () => {
  let guard: AdminVerificationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminVerificationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

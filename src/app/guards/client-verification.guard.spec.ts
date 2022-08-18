import { TestBed } from '@angular/core/testing';

import { ClientVerificationGuard } from './client-verification.guard';

describe('ClientVerificationGuard', () => {
  let guard: ClientVerificationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClientVerificationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

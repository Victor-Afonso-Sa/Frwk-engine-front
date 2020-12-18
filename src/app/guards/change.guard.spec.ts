import { TestBed } from '@angular/core/testing';

import { ChangeGuard } from './change.guard';

describe('ChangeGuard', () => {
  let guard: ChangeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChangeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

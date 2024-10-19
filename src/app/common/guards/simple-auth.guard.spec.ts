import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { simpleAuthGuard } from './simple-auth.guard';

describe('simpleAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => simpleAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

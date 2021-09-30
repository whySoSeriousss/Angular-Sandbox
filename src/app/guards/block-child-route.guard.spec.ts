import { TestBed } from '@angular/core/testing';

import { BlockChildRouteGuard } from './block-child-route.guard';

describe('BlockChildRouteGuard', () => {
  let guard: BlockChildRouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BlockChildRouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

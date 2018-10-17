import { TestBed, async, inject } from '@angular/core/testing';

import { UserInfoGuard } from './user-info.guard';

describe('UserInfoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInfoGuard]
    });
  });

  it('should ...', inject([UserInfoGuard], (guard: UserInfoGuard) => {
    expect(guard).toBeTruthy();
  }));
});

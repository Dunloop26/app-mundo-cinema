import { TestBed } from '@angular/core/testing';

import { HasTicketGuard } from './has-ticket.guard';

describe('HasTicketGuard', () => {
  let guard: HasTicketGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasTicketGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InvoiceShowResolver } from './invoice-show.resolver';

describe('InvoiceShowResolver', () => {
  let resolver: InvoiceShowResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InvoiceShowResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

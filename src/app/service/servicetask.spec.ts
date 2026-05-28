import { TestBed } from '@angular/core/testing';

import { Servicetask } from './servicetask';

describe('Servicetask', () => {
  let service: Servicetask;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Servicetask);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

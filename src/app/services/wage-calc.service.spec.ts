import { TestBed } from '@angular/core/testing';

import { WageCalcService } from './wage-calc.service';

describe('WageCalcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WageCalcService = TestBed.get(WageCalcService);
    expect(service).toBeTruthy();
  });
});

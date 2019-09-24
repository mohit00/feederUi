import { TestBed } from '@angular/core/testing';

import { FeederService } from './feeder.service';

describe('FeederService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeederService = TestBed.get(FeederService);
    expect(service).toBeTruthy();
  });
});

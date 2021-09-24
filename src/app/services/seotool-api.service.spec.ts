import { TestBed } from '@angular/core/testing';

import { SeotoolApiService } from './seotool-api.service';

describe('SeotoolApiService', () => {
  let service: SeotoolApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeotoolApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ModalsServicesService } from './modals-services.service';

describe('ModalsServicesService', () => {
  let service: ModalsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

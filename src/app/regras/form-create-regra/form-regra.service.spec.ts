/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormRegraService } from './form-regra.service';

describe('Service: FormRegra', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormRegraService]
    });
  });

  it('should ...', inject([FormRegraService], (service: FormRegraService) => {
    expect(service).toBeTruthy();
  }));
});

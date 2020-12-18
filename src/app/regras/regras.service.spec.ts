/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegrasService } from './regras.service';

describe('Service: Regras', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegrasService]
    });
  });

  it('should ...', inject([RegrasService], (service: RegrasService) => {
    expect(service).toBeTruthy();
  }));
});

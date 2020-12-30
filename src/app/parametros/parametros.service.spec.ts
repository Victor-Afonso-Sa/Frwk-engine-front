/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParametrosService } from './parametros.service';

describe('Service: Parametros', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParametrosService]
    });
  });

  it('should ...', inject([ParametrosService], (service: ParametrosService) => {
    expect(service).toBeTruthy();
  }));
});

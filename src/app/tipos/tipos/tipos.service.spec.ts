/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TiposService } from './tipos.service';

describe('Service: Tipos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TiposService]
    });
  });

  it('should ...', inject([TiposService], (service: TiposService) => {
    expect(service).toBeTruthy();
  }));
});

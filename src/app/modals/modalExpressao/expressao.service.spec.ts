/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExpressaoService } from './expressao.service';

describe('Service: Expressao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpressaoService]
    });
  });

  it('should ...', inject([ExpressaoService], (service: ExpressaoService) => {
    expect(service).toBeTruthy();
  }));
});

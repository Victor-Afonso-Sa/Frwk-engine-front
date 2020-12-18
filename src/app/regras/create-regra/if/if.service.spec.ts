/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IfService } from './if.service';

describe('Service: If', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IfService]
    });
  });

  it('should ...', inject([IfService], (service: IfService) => {
    expect(service).toBeTruthy();
  }));
});

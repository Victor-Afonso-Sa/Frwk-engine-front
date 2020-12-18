/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewVarService } from './new-var.service';

describe('Service: NewVar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewVarService]
    });
  });

  it('should ...', inject([NewVarService], (service: NewVarService) => {
    expect(service).toBeTruthy();
  }));
});

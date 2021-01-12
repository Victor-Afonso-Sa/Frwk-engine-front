/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TrilhaService } from './trilha.service';

describe('Service: Trilha', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrilhaService]
    });
  });

  it('should ...', inject([TrilhaService], (service: TrilhaService) => {
    expect(service).toBeTruthy();
  }));
});

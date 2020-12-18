/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IteracaoComponent } from './iteracao.component';

describe('IteracaoComponent', () => {
  let component: IteracaoComponent;
  let fixture: ComponentFixture<IteracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IteracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

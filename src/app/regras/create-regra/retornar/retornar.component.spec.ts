/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RetornarComponent } from './retornar.component';

describe('RetornarComponent', () => {
  let component: RetornarComponent;
  let fixture: ComponentFixture<RetornarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetornarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetornarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

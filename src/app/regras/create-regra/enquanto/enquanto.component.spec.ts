/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EnquantoComponent } from './enquanto.component';

describe('EnquantoComponent', () => {
  let component: EnquantoComponent;
  let fixture: ComponentFixture<EnquantoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquantoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquantoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

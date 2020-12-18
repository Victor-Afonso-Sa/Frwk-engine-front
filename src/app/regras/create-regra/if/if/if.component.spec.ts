/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IfComponent } from './if.component';

describe('IfComponent', () => {
  let component: IfComponent;
  let fixture: ComponentFixture<IfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

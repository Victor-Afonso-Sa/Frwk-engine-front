/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestRegraComponent } from './test-regra.component';

describe('TestRegraComponent', () => {
  let component: TestRegraComponent;
  let fixture: ComponentFixture<TestRegraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRegraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRegraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

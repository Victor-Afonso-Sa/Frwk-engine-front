import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreatePastasComponent } from './modal-create-pastas.component';

describe('ModalCreatePastasComponent', () => {
  let component: ModalCreatePastasComponent;
  let fixture: ComponentFixture<ModalCreatePastasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCreatePastasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreatePastasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

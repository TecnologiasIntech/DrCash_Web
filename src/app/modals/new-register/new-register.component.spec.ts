import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRegisterComponent } from './new-register.component';

describe('NewRegisterComponent', () => {
  let component: NewRegisterComponent;
  let fixture: ComponentFixture<NewRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialCashComponent } from './initial-cash.component';

describe('InitialCashComponent', () => {
  let component: InitialCashComponent;
  let fixture: ComponentFixture<InitialCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashOutComponent } from './cash-out.component';

describe('CashOutComponent', () => {
  let component: CashOutComponent;
  let fixture: ComponentFixture<CashOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

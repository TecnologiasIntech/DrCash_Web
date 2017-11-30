import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashInComponent } from './cash-in.component';

describe('CashInComponent', () => {
  let component: CashInComponent;
  let fixture: ComponentFixture<CashInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedStatementsComponent } from './closed-statements.component';

describe('ClosedStatementsComponent', () => {
  let component: ClosedStatementsComponent;
  let fixture: ComponentFixture<ClosedStatementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedStatementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

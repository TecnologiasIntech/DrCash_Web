import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTransactionComponent } from './update-transaction.component';

describe('UpdateTransactionComponent', () => {
  let component: UpdateTransactionComponent;
  let fixture: ComponentFixture<UpdateTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

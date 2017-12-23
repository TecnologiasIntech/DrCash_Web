import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetUserComponent } from './reset-user.component';

describe('ResetUserComponent', () => {
  let component: ResetUserComponent;
  let fixture: ComponentFixture<ResetUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseDateComponent } from './close-date.component';

describe('CloseDateComponent', () => {
  let component: CloseDateComponent;
  let fixture: ComponentFixture<CloseDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

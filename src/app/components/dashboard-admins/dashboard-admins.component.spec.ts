import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAdminsComponent } from './dashboard-admins.component';

describe('DashboardAdminsComponent', () => {
  let component: DashboardAdminsComponent;
  let fixture: ComponentFixture<DashboardAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

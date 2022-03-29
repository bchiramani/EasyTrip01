import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardServiceProvidersComponent } from './dashboard-service-providers.component';

describe('DashboardServiceProvidersComponent', () => {
  let component: DashboardServiceProvidersComponent;
  let fixture: ComponentFixture<DashboardServiceProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardServiceProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardServiceProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

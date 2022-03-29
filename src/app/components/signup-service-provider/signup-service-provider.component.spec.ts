import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupServiceProviderComponent } from './signup-service-provider.component';

describe('SignupServiceProviderComponent', () => {
  let component: SignupServiceProviderComponent;
  let fixture: ComponentFixture<SignupServiceProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupServiceProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

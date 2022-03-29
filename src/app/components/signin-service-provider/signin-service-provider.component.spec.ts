import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninServiceProviderComponent } from './signin-service-provider.component';

describe('SigninServiceProviderComponent', () => {
  let component: SigninServiceProviderComponent;
  let fixture: ComponentFixture<SigninServiceProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninServiceProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

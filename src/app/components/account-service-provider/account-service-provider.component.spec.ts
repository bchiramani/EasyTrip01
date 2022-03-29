import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountServiceProviderComponent } from './account-service-provider.component';

describe('AccountServiceProviderComponent', () => {
  let component: AccountServiceProviderComponent;
  let fixture: ComponentFixture<AccountServiceProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountServiceProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountServiceProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

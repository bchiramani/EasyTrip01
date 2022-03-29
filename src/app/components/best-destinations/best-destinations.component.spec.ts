import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestDestinationsComponent } from './best-destinations.component';

describe('BestDestinationsComponent', () => {
  let component: BestDestinationsComponent;
  let fixture: ComponentFixture<BestDestinationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestDestinationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

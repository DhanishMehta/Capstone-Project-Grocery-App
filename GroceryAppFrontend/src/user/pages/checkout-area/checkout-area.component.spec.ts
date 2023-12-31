import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAreaComponent } from './checkout-area.component';

describe('CheckoutAreaComponent', () => {
  let component: CheckoutAreaComponent;
  let fixture: ComponentFixture<CheckoutAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutAreaComponent]
    });
    fixture = TestBed.createComponent(CheckoutAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

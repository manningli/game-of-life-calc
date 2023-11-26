import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishingOrderComponent } from './finishing-order.component';

describe('FinishingOrderComponent', () => {
  let component: FinishingOrderComponent;
  let fixture: ComponentFixture<FinishingOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinishingOrderComponent]
    });
    fixture = TestBed.createComponent(FinishingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

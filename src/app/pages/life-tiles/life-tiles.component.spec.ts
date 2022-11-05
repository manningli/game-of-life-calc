import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeTilesComponent } from './life-tiles.component';

describe('LifeTilesComponent', () => {
  let component: LifeTilesComponent;
  let fixture: ComponentFixture<LifeTilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeTilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

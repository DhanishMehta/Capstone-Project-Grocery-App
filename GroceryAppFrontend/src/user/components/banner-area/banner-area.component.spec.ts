import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerAreaComponent } from './banner-area.component';

describe('BannerAreaComponent', () => {
  let component: BannerAreaComponent;
  let fixture: ComponentFixture<BannerAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerAreaComponent]
    });
    fixture = TestBed.createComponent(BannerAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

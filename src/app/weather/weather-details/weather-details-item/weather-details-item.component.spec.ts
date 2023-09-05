import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDetailsItemComponent } from './weather-details-item.component';

describe('WeatherDetailsItemComponent', () => {
  let component: WeatherDetailsItemComponent;
  let fixture: ComponentFixture<WeatherDetailsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherDetailsItemComponent]
    });
    fixture = TestBed.createComponent(WeatherDetailsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

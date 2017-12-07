import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDayForecastComponent } from './weather-day-forecast.component';

describe('WeatherDayForecastComponent', () => {
  let component: WeatherDayForecastComponent;
  let fixture: ComponentFixture<WeatherDayForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherDayForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDayForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWeekForecastComponent } from './weather-week-forecast.component';

describe('WeatherWeekForecastComponent', () => {
  let component: WeatherWeekForecastComponent;
  let fixture: ComponentFixture<WeatherWeekForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherWeekForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherWeekForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

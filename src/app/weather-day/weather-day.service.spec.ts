import { TestBed, inject } from '@angular/core/testing';

import { WeatherDayService } from './weather-day.service';

describe('WeatherDayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherDayService]
    });
  });

  it('should be created', inject([WeatherDayService], (service: WeatherDayService) => {
    expect(service).toBeTruthy();
  }));
});

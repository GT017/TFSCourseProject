import { TestBed, inject } from '@angular/core/testing';

import { WeatherWeekService } from './weather-week.service';

describe('WeatherWeekService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherWeekService]
    });
  });

  it('should be created', inject([WeatherWeekService], (service: WeatherWeekService) => {
    expect(service).toBeTruthy();
  }));
});

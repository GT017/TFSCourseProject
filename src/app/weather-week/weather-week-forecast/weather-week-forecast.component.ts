import {Component, Input, OnInit} from '@angular/core';
import {LocalStorageService} from '../../localStorageService/local-storage.service';

@Component({
  selector: 'app-weather-week-forecast',
  templateUrl: './weather-week-forecast.component.html',
  styleUrls: ['./weather-week-forecast.component.css']
})
export class WeatherWeekForecastComponent implements OnInit {

  @Input() cityName;
  @Input() weatherWeek;

  constructor(private localStorageService: LocalStorageService) { }

  private humChecked = this.localStorageService.getItem('humChecked');
  private pressChecked = this.localStorageService.getItem('pressChecked');
  private dayTempChecked = this.localStorageService.getItem('dayTempChecked');
  private nightTempChecked = this.localStorageService.getItem('nightTempChecked');
  private maxDailyChecked = this.localStorageService.getItem('maxDailyChecked');
  private minDailyChecked = this.localStorageService.getItem('minDailyChecked');
  private mornTempChecked = this.localStorageService.getItem('mornTempChecked');
  private eveTempChecked = this.localStorageService.getItem('eveTempChecked');
  private windDirectionChecked = this.localStorageService.getItem('windDirectionChecked');
  private windSpeedChecked = this.localStorageService.getItem('windSpeedChecked');

  ngOnInit() {
  }

}

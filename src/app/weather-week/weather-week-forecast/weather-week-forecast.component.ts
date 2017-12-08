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

  private humChecked = this.localStorageService.getItem('isHumChecked');
  private pressChecked = this.localStorageService.getItem('isPressChecked');
  private dayTempChecked = this.localStorageService.getItem('isDayTempChecked');
  private nightTempChecked = this.localStorageService.getItem('isNightTempChecked');
  private maxDailyChecked = this.localStorageService.getItem('isMaxDailyChecked');
  private minDailyChecked = this.localStorageService.getItem('isMinDailyChecked');
  private mornTempChecked = this.localStorageService.getItem('isMornTempChecked');
  private eveTempChecked = this.localStorageService.getItem('isEveTempChecked');
  private windDirectionChecked = this.localStorageService.getItem('isWindDirectionChecked');
  private windSpeedChecked = this.localStorageService.getItem('isWindSpeedChecked');

  ngOnInit() {
  }

}

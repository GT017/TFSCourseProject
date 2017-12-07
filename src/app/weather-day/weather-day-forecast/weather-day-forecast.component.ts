import {Component, Input, OnInit} from '@angular/core';
import {WeatherDay} from "../model/weather-day";
import {LocalStorageService} from '../../localStorageService/local-storage.service';

@Component({
  selector: 'app-weather-day-forecast',
  templateUrl: './weather-day-forecast.component.html',
  styleUrls: ['./weather-day-forecast.component.css']
})
export class WeatherDayForecastComponent implements OnInit {

  @Input() cityName;
  @Input() weatherDay;

  constructor(private localStorageService: LocalStorageService) { }

  private humidityChecked = this.localStorageService.getItem('isHumidityChecked');
  private pressureChecked = this.localStorageService.getItem('isPressureChecked');
  private tempChecked = this.localStorageService.getItem('isTempChecked');
  private tempMaxChecked = this.localStorageService.getItem('isTempMaxChecked');
  private tempMinChecked = this.localStorageService.getItem('isTempMinChecked');
  private windDirChecked = this.localStorageService.getItem('isWindDirChecked');
  private windSpChecked = this.localStorageService.getItem('isWindSpChecked');

  ngOnInit() {
  }

}

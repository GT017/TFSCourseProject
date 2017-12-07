import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/operator/map';

const  BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
const APP_ID = 'appid=eccfe15d98c3262805bb57ffb420922b';
const UNITS = 'units=metric';

@Injectable()
export class WeatherWeekService {

  constructor(private http: HttpClient) { }

  getWeatherWeekData(cityName: string, days: number) {
    return this.http.get(
      `${BASE_URL}${cityName}&${UNITS}&cnt=${days}&${APP_ID}`)
      .map(response => {
        return response ? response['list'] : [];
    });
  }

  parseWeatherWeekData(list: Object[]) {
    return list.map(item => {
      return {
        temp_day: item['temp']['day'],
        temp_night: item['temp']['night'],
        temp_min: item['temp']['min'],
        temp_max: item['temp']['max'],
        temp_morn: item['temp']['morn'],
        temp_eve: item['temp']['eve'],
        pressure: item['pressure'],
        humidity: item['humidity'],
        description: item['weather']['description'],
        icon: item['weather']['icon']
      };
    });
  }

}

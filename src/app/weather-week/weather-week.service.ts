import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/operator/map';
import {Observable} from "rxjs/Observable";
import {WeatherWeek} from "./model/weather-week";

const  BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
const APP_ID = 'appid=927d09bc49dbee6aac7f5cb1df707542';
const UNITS = 'units=metric';

@Injectable()
export class WeatherWeekService {

  constructor(private http: HttpClient) { }

  getWeatherWeekData(cityName: string) {
    return this.http.get(
      `${BASE_URL}${cityName}&${UNITS}&cnt=16&${APP_ID}`)
      .map(response => {
        return response ? this.parseWeatherWeekData(response['list']) : [];
    });
  }

  parseWeatherWeekData(list: Object[]) {
    return list.map(item => {
      return {
        date: new Date(),
        temp_day: item['temp']['day'],
        temp_night: item['temp']['night'],
        temp_min: item['temp']['min'],
        temp_max: item['temp']['max'],
        temp_morn: item['temp']['morn'],
        temp_eve: item['temp']['eve'],
        pressure: item['pressure'],
        humidity: item['humidity'],
        description: item['weather'][0]['description'],
        img: `http://openweathermap.org/img/w/${item['weather'][0]['icon']}.png`,
        wind_sp: item['speed'],
        wind_dir: this.getWindDirection(item['deg'])
      };
    });
  }

  /*setDate(currVal, ind, array) {
    currVal['date'].setDate(currVal['date'].getDate() + ind);
  }*/

  getWindDirection(deg: number): string {
    if ((deg < 22.5) || (deg >= 337.5)) {
      return 'North';
    }
    if ((deg < 67.5) || (deg >= 22.5)) {
      return 'North-East';
    }
    if ((deg < 112.5) || (deg >= 67.5 )) {
      return 'East';
    }
    if ((deg < 157.5) || (deg >= 112.5 )) {
      return 'South-East';
    }
    if ((deg < 202.5) || (deg >= 157.5)) {
      return 'South';
    }
    if ((deg < 247.5) || (deg >= 202.5)) {
      return 'South-West';
    }
    if ((deg < 292.5) || (deg >= 247.5 )) {
      return 'West';
    }
    if ((deg < 337.5) || (deg >= 292.5 )) {
      return 'North-West';
    }
  }

}

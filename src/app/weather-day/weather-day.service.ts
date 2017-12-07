import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {WeatherDay} from "./model/weather-day";

const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?q=';
const APP_ID = 'appid=fee0e2984791eaa2566619a32f4e75df';
const UNITS = 'units=metric';
const REQUEST_TIME = 15;

@Injectable()
export class WeatherDayService {

  constructor(private http: HttpClient) { }

  getWeatherDayData(cityName: string): Observable<WeatherDay[]> {
    return this.http.get(
      `${BASE_URL}${cityName}&${UNITS}&${APP_ID}`)
      .map(response => {
        return response ? this.parseWeatherDayData(response['list']) : [];
      });
  }

  parseWeatherDayData(list: Object[]) {
    return list.map(item => {
      return {
        date: item['dt_txt'],
        description: item['weather'][0]['description'],
        img: item['weather'][0]['icon'],
        temp: item['main']['temp'],
        temp_min: item['main']['temp_min'],
        temp_max: item['main']['temp_max'],
        humidity: item['main']['humidity'],
        pressure: item['main']['pressure'],
        wind_sp: item['wind']['speed'],
        wind_dir: item['wind']['deg']
      };
    })
      .map(item => {
        return {
          date: new Date(item.date.replace(/\s/, 'T')),
          description: item.description,
          img: `http://openweathermap.org/img/w/${item.img}.png`,
          temp: item.temp,
          temp_max: item.temp_max,
          temp_min: item.temp_min,
          humidity: item.humidity,
          pressure: item.pressure,
          wind_sp: item.wind_sp,
          wind_dir: this.getWindDirection(item.wind_dir)
        };
      });
  }

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

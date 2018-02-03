import { Component, OnInit } from '@angular/core';
import {WeatherWeekService} from './weather-week.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WeatherWeek} from './model/weather-week';
import {LocalStorageService} from "../localStorageService/local-storage.service";
import {HttpErrorResponse} from "@angular/common/http";
import {IndexedDBService} from "../indexedDBService/indexed-db.service";
import {IFilter} from "../filter/model/filter";

const REGEXP = /^[1]?[0-9]$/;

@Component({
  selector: 'app-weather-week',
  templateUrl: './weather-week.component.html',
  styleUrls: ['./weather-week.component.css']
})
export class WeatherWeekComponent implements OnInit {
  form: FormGroup;
  weatherWeekData: WeatherWeek[];
  cityName: string;
  days: number;
  httpError: string;

  filters = [
    {
      title: 'Humidity',
      marked: false
    },
    {
      title: 'Pressure',
      marked: false
    },
    {
      title: 'Day temperature',
      marked: false
    },
    {
      title: 'Night temperature',
      marked: false
    },
    {
      title: 'Maximum daily temperature',
      marked: false
    },
    {
      title: 'Minimum daily temperature',
      marked: false
    },
    {
      title: 'Morning temperature',
      marked: false
    },
    {
      title: 'Evening temperature',
      marked: false
    },
    {
      title: 'Wind direction',
      marked: false
    },
    {
      title: 'Wind speed',
      marked: false
    }
  ];

  constructor(private formBuilder: FormBuilder,
              private weatherWeekService: WeatherWeekService,
              private localStorageService: LocalStorageService,
              private indexedDBService: IndexedDBService) { }

  getErrors(errors: any): string {
    if (errors['required']) {
      return 'This field is required';
    }

    if (errors['min']) {
      return `Min value is ${errors['min']['min']}`;
    }

    if (errors['max']) {
      return `Max value is ${errors['max']['max']}`;
    }

    if (errors['minlength']) {
      return `Min length is ${errors['minlength']['requiredLength']}`;
    }

    if (errors['maxlength']) {
      return `Max length is ${errors['maxlength']['requiredLength']}`;
    }

    if (errors['pattern'] && errors['pattern']['requiredPattern'] === REGEXP.toString()) {
      return `Only numbers are allowed`;
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      days: ['', [Validators.required, Validators.min(2), Validators.max(16), Validators.pattern(REGEXP)]]
    });
  }

  onClick() {
    const currTime = new Date();

    this.indexedDBService.getDataFromDB(this.cityName, 'WeekForecast').then((data) => {
        let diffTime = currTime.getTime() - data['requestTime'].getTime();
        diffTime = Math.round(((diffTime % 86400000) % 3600000) / 60000);


        if (diffTime < 15) {
          this.weatherWeekData = this.getFinalData(data['weatherData'], this.days);
          this.httpError = '';
        } else {
          this.weatherWeekService.getWeatherWeekData(this.cityName).subscribe((dataFromAPI) => {
              this.setDate(dataFromAPI);
              this.indexedDBService.addDataToDB(this.cityName, dataFromAPI, currTime, 'WeekForecast');
              this.weatherWeekData = this.getFinalData(dataFromAPI, this.days);
              this.httpError = '';
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log('An error occurred:', err.error.message);
              } else {
                console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                this.httpError = `Oops! Something went wrong: ${err.error.message}`;
              }
            });
        }
      },
      (err) => {
        console.log(err);
        this.weatherWeekService.getWeatherWeekData(this.cityName).subscribe((data) => {
            this.setDate(data);
            this.indexedDBService.addDataToDB(this.cityName, data, currTime, 'WeekForecast');
            this.weatherWeekData = this.getFinalData(data, this.days);
            this.httpError = '';
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log('An error occurred:', err.error.message);
            } else {
              console.log(`Backend returned code ${err.status}, body was: ${err.error.message}`);
              this.httpError = `Oops! Something went wrong: ${err.error.message}`;
            }
          }
        );
      });
  }

  getFinalData(weatherData: WeatherWeek[], days: number) {
    return weatherData.slice(0, days);
  }

  setDate(array) {
    for (let i = 0; i < array.length; i++) {
      let day = array[i]['date'].getDate() + i;
      let month = array[i]['date'].getMonth();
      let year = array[i]['date'].getFullYear();
      array[i]['date'] = new Date(year, month, day);
    }
  }

  /*dateDiffInDays(a, b) {

    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY));
  }*/

  onCityNameKeyUp(event) {
    this.cityName = event.target.value;
  }

  onDaysKeyUp(event) {
    this.days = event.target.value;
  }

  /*togglePropertyChecked(property: string) {
    if (property === 'isHumChecked') {
      this.isHumChecked = !this.isHumChecked;
      this.localStorageService.setItem('isHumChecked', this.isHumChecked);
    }
    if (property === 'isPressChecked') {
      this.isPressChecked = !this.isPressChecked;
      this.localStorageService.setItem('isPressChecked', this.isPressChecked);
    }
    if (property === 'isDayTempChecked') {
      this.isDayTempChecked = !this.isDayTempChecked;
      this.localStorageService.setItem('isDayTempChecked', this.isDayTempChecked);
    }
    if (property === 'isNightTempChecked') {
      this.isNightTempChecked = !this.isNightTempChecked;
      this.localStorageService.setItem('isNightTempChecked', this.isNightTempChecked);
    }
    if (property === 'isMaxDailyChecked') {
      this.isMaxDailyChecked = !this.isMaxDailyChecked;
      this.localStorageService.setItem('isMaxDailyChecked', this.isMaxDailyChecked);
    }
    if (property === 'isMinDailyChecked') {
      this.isMinDailyChecked = !this.isMinDailyChecked;
      this.localStorageService.setItem('isMinDailyChecked', this.isMinDailyChecked);
    }
    if (property === 'isMornTempChecked') {
      this.isMornTempChecked = !this.isMornTempChecked;
      this.localStorageService.setItem('isMornTempChecked', this.isMornTempChecked);
    }
    if (property === 'isEveTempChecked') {
      this.isEveTempChecked = !this.isEveTempChecked;
      this.localStorageService.setItem('isEveTempChecked', this.isEveTempChecked);
    }
    if (property === 'isWindDirectionChecked') {
      this.isWindDirectionChecked = !this.isWindDirectionChecked;
      this.localStorageService.setItem('isWindDirectionChecked', this.isWindDirectionChecked);
    }
    if (property === 'isWindSpeedChecked') {
      this.isWindSpeedChecked = !this.isWindSpeedChecked;
      this.localStorageService.setItem('isWindSpeedChecked', this.isWindSpeedChecked);
    }
  }*/

  toggleProperty(filter: IFilter) {
    filter.marked = !filter.marked;
    this.localStorageService.setItem(filter.title, filter.marked);
  }
}

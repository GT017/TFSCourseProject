import {Component, Input, OnInit} from '@angular/core';
import {WeatherDayService} from './weather-day.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WeatherDay} from './model/weather-day';
import {LocalStorageService} from '../localStorageService/local-storage.service';
import {IndexedDBService} from '../indexedDBService/indexed-db.service';
import {HttpErrorResponse} from '@angular/common/http';

const REGEXP = /^[1-6]$/;
const _MS_PER_DAY = 1000 * 60 * 60 * 24;

@Component({
  selector: 'app-weather-day',
  templateUrl: './weather-day.component.html',
  styleUrls: ['./weather-day.component.css']
})
export class WeatherDayComponent implements OnInit {

  form: FormGroup;
  weatherDayData;
  cityName: string;
  days: number;
  httpError: string;

  private isHumidityChecked = false;
  private  isPressureChecked = false;
  private  isTempChecked = false;
  private  isTempMaxChecked = false;
  private  isTempMinChecked = false;
  private  isWindDirChecked = false;
  private  isWindSpChecked = false;


  constructor(private formBuilder: FormBuilder,
              private weatherDayService: WeatherDayService,
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
      days: ['', [Validators.required, Validators.min(2), Validators.max(5), Validators.pattern(REGEXP)]]
    });

    this.localStorageService.setItem('isHumidityChecked', false);
    this.localStorageService.setItem('isPressureChecked', false);
    this.localStorageService.setItem('isTempChecked', false);
    this.localStorageService.setItem('isTempMaxChecked', false);
    this.localStorageService.setItem('isTempMinChecked', false);
    this.localStorageService.setItem('isWindDirChecked', false);
    this.localStorageService.setItem('isWindSpChecked', false);
  }

  onClick() {
    const currTime = new Date();

    this.indexedDBService.getDataFromDB(this.cityName, 'DayForecast').then((data) => {
        let diffTime = currTime.getTime() - data['requestTime'].getTime();
        diffTime = Math.round(((diffTime % 86400000) % 3600000) / 60000);

        if (diffTime < 15) {
          this.weatherDayData = this.getFinalData(data['weatherData'], currTime);
        } else {
          this.weatherDayService.getWeatherDayData(this.cityName).subscribe((dataFromAPI) => {
            this.indexedDBService.addDataToDB(this.cityName, dataFromAPI, currTime, 'DayForecast');
            this.weatherDayData = this.getFinalData(dataFromAPI, currTime);
          },
            (err: HttpErrorResponse) => {
            this.httpError = 'Oops! Something went wrong';
            if (err.error instanceof Error) {
              console.log('An error occurred:', err.error.message);
            } else {
              console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
            });
        }
    },
      (err) => {
      console.log(err);
      this.weatherDayService.getWeatherDayData(this.cityName).subscribe((data) => {
        this.indexedDBService.addDataToDB(this.cityName, data, currTime, 'DayForecast');
        this.weatherDayData = this.getFinalData(data, currTime);
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

  getFinalData(weatherData: WeatherDay[], currTime: Date) {
    return weatherData.filter((item) => {
      if (this.dateDiffInDays(currTime, item.date) < this.days) {
        return item;
      }
      return;
    });

  }


  dateDiffInDays(a, b) {

    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.abs(Math.floor((utc2 - utc1) / _MS_PER_DAY));
  }

  onCityNameKeyUp(event) {
    this.cityName = event.target.value;
  }

  onDaysKeyUp(event) {
    this.days = event.target.value;
  }

  togglePropertyChecked(property: string) {
    if (property === 'isHumidityChecked') {
      this.isHumidityChecked = !this.isHumidityChecked;
      this.localStorageService.setItem('isHumidityChecked', this.isHumidityChecked);
    }
    if (property === 'isPressureChecked') {
      this.isPressureChecked = !this.isPressureChecked;
      this.localStorageService.setItem('isPressureChecked', this.isPressureChecked);
    }
    if (property === 'isTempChecked') {
      this.isTempChecked = !this.isTempChecked;
      this.localStorageService.setItem('isTempChecked', this.isTempChecked);
    }
    if (property === 'isTempMaxChecked') {
      this.isTempMaxChecked = !this.isTempMaxChecked;
      this.localStorageService.setItem('isTempMaxChecked', this.isTempMaxChecked);
    }
    if (property === 'isTempMinChecked') {
      this.isTempMinChecked = !this.isTempMinChecked;
      this.localStorageService.setItem('isTempMinChecked', this.isTempMinChecked);
    }
    if (property === 'isWindDirChecked') {
      this.isWindDirChecked = !this.isWindDirChecked;
      this.localStorageService.setItem('isWindDirChecked', this.isWindDirChecked);
    }
    if (property === 'isWindSpChecked') {
      this.isWindSpChecked = !this.isWindSpChecked;
      this.localStorageService.setItem('isWindSpChecked', this.isWindSpChecked);
    }
  }
}

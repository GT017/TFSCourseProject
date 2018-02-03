import {Component, Input, OnInit} from '@angular/core';
import {WeatherDayService} from './weather-day.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WeatherDay} from './model/weather-day';
import {LocalStorageService} from '../localStorageService/local-storage.service';
import {IndexedDBService} from '../indexedDBService/indexed-db.service';
import {HttpErrorResponse} from '@angular/common/http';
import {IFilter} from "../filter/model/filter";

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
      title: 'Current temperature',
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
      title: 'Wind direction',
      marked: false
    },
    {
      title: 'Wind speed',
      marked: false
    }
    ];




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


  }

  onClick() {
    const currTime = new Date();

    this.indexedDBService.getDataFromDB(this.cityName, 'DayForecast').then((data) => {
        let diffTime = currTime.getTime() - data['requestTime'].getTime();
        diffTime = Math.round(((diffTime % 86400000) % 3600000) / 60000);

        if (diffTime < 15) {
          this.weatherDayData = this.getFinalData(data['weatherData'], currTime);
          this.httpError = '';
        } else {
          this.weatherDayService.getWeatherDayData(this.cityName).subscribe((dataFromAPI) => {
            this.indexedDBService.addDataToDB(this.cityName, dataFromAPI, currTime, 'DayForecast');
            this.weatherDayData = this.getFinalData(dataFromAPI, currTime);
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
      this.weatherDayService.getWeatherDayData(this.cityName).subscribe((data) => {
        this.indexedDBService.addDataToDB(this.cityName, data, currTime, 'DayForecast');
        this.weatherDayData = this.getFinalData(data, currTime);
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

  toggleProperty(filter: IFilter) {
    filter.marked = !filter.marked;
    this.localStorageService.setItem(filter.title, filter.marked);
  }
}

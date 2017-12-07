import {Component, Input, OnInit} from '@angular/core';
import {WeatherDayService} from './weather-day.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WeatherDay} from './model/weather-day';
import {LocalStorageService} from '../localStorageService/local-storage.service';
import {IndexedDBService} from '../indexedDBService/indexed-db.service';

const REGEXP = /^[1-6]$/;

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

    // this.weatherDayService.createDB();
  }

  onClick() {
    const currTime = new Date();

    /*this.indexedDBService.getDataFromDB(this.cityName).then((data) => {
      console.log(data);
    },
      (err) => {
      console.log(err);
      });*/



    /*if (!this.indexedDBService.existsInDB(this.cityName)) {
    this.weatherDayService.getWeatherDayData(this.cityName)
          .subscribe(results => {
            this.weatherDayData = results;
            this.indexedDBService.addInDB(this.cityName, currTime, results);
            console.log(results);
      });
  } else {
    console.log('fvjfv');
    const dataFromDB = this.indexedDBService.getRequestData(this.cityName);
    let diffTime = currTime.getTime() - dataFromDB.requestTime.getTime();
    diffTime = Math.round(((diffTime % 86400000) % 3600000) / 60000);

    if (diffTime < 15) {
      this.weatherDayData = dataFromDB.weatherData;
      this.indexedDBService.addInDB(this.cityName, currTime, results);
    } else {
      this.weatherDayService.getWeatherDayData(this.cityName)
        .subscribe(results => {
          this.weatherDayData = results;
          this.indexedDBService.addInDB(this.cityName, currTime, results);
          //console.log(results);
        });

    }
  }*/
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

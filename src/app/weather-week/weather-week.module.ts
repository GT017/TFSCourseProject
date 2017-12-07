import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherWeekComponent } from './weather-week.component';
import {HttpClientModule} from '@angular/common/http';
import {WeatherWeekService} from './weather-week.service';
import {ReactiveFormsModule} from '@angular/forms';
import { WeatherWeekForecastComponent } from './weather-week-forecast/weather-week-forecast.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [WeatherWeekService],
  declarations: [WeatherWeekComponent, WeatherWeekForecastComponent]
})
export class WeatherWeekModule { }

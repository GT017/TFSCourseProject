import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherDayComponent } from './weather-day.component';
import {WeatherDayService} from './weather-day.service';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { WeatherDayForecastComponent } from './weather-day-forecast/weather-day-forecast.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [WeatherDayComponent, WeatherDayForecastComponent],
  providers: [WeatherDayService],
  exports: [WeatherDayComponent]
})
export class WeatherDayModule { }

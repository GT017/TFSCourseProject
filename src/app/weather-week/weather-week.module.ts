import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherWeekComponent } from './weather-week.component';
import {HttpClientModule} from '@angular/common/http';
import {WeatherWeekService} from './weather-week.service';
import {ReactiveFormsModule} from '@angular/forms';
import { WeatherWeekForecastComponent } from './weather-week-forecast/weather-week-forecast.component';
import {FilterComponent} from "../filter/filter.component";
import {FilterModule} from "../filter/filter.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FilterModule
  ],
  providers: [WeatherWeekService],
  declarations: [WeatherWeekComponent, WeatherWeekForecastComponent],
  exports: [WeatherWeekComponent]
})
export class WeatherWeekModule { }

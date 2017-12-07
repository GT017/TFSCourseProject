import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {WeatherDayComponent} from './weather-day/weather-day.component';
import {RouterModule} from '@angular/router';
import {WeatherDayModule} from './weather-day/weather-day.module';
import {WeatherWeekComponent} from './weather-week/weather-week.component';
import {WeatherWeekModule} from './weather-week/weather-week.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import {IndexedDBService} from './indexedDBService/indexed-db.service';
import {LocalStorageService} from './localStorageService/local-storage.service';



const ROUTES = [
  {path: '', component: HomePageComponent},
  {path: 'day', component: WeatherDayComponent},
  {path: 'week', component: WeatherWeekComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    WeatherDayModule,
    WeatherWeekModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [LocalStorageService, IndexedDBService],
  bootstrap: [AppComponent]
})
export class AppModule { }

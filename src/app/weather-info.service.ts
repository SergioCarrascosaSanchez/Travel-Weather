import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coordinates } from './coordinates';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherInfoService {
  constructor(private http: HttpClient) {}

  years = [2022, 2021, 2020, 2019, 2018, 2017];

  getWeatherData(coordinates: Coordinates, startDate: Date, endDate: Date) {
    console.log(startDate.toISOString().substr(0, 10))
    
    let templateStartDate = new Date();
    templateStartDate.setDate(startDate.getDate());
    templateStartDate.setMonth(startDate.getMonth());

    let templateEndDate = new Date();
    templateEndDate.setDate(endDate.getDate());
    templateEndDate.setMonth(endDate.getMonth());

    return forkJoin(
      this.years.map((year) => {
        templateStartDate.setFullYear(year);
        templateEndDate.setFullYear(year);
        console.log(`${templateStartDate.getFullYear()}-${templateStartDate.getMonth()}-${templateStartDate.getDate()}`)
        return this.http.get(
          `https://archive-api.open-meteo.com/v1/era5?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&timezone=GMT&start_date=${templateStartDate.toISOString().substr(0, 10)}&end_date=${templateEndDate.toISOString().substr(0, 10)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,snowfall_sum `
        );
      })
    );
  }
}

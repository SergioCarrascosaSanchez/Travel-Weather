import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coordinates } from './coordinates';

@Injectable({
  providedIn: 'root',
})
export class WeatherInfoService {
  constructor(private http: HttpClient) {}

  getWeatherData(
    coordinates: Coordinates,
    startDate: string,
    endDate: string
  ) {
    return this.http.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&timezone=GMT&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,snowfall_sum `
    );
  }
}

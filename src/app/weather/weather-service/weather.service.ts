import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  catchError,
  firstValueFrom,
  of,
  throwError,
} from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Coordinates } from './coordinates';
import { DailyWeatherInfo } from 'src/app/weather/daily-weather-info.model';
import { WeatherResponse } from './weather-response.model';
import { CoordinatesResponse } from './coordinates-response.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService{
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  weatherInfoSubject: BehaviorSubject<DailyWeatherInfo[]> = new BehaviorSubject<DailyWeatherInfo[]>(null);
  weatherInfo = this.weatherInfoSubject.asObservable()

  constructor(private http: HttpClient) {}

  fetchWeatherData(
    city: string,
    country: string,
    startDate: Date,
    endDate: Date
  ) {
    city = 'Madrid';
    country = 'Spain';
    startDate.setFullYear(startDate.getFullYear() - 1);
    endDate.setFullYear(endDate.getFullYear() - 1);

    this.getCoordinates(city, country).pipe(
      take(1),
      switchMap((coordinates: Coordinates) => {
        return this.http
          .get<WeatherResponse>(
            `https://archive-api.open-meteo.com/v1/era5?latitude=${
              coordinates.latitude
            }&longitude=${
              coordinates.longitude
            }&timezone=GMT&start_date=${startDate
              .toISOString()
              .substring(0, 10)}&end_date=${endDate
              .toISOString()
              .substring(
                0,
                10
              )}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,snowfall_sum,,apparent_temperature_max,apparent_temperature_min,weathercode `
          )
          .pipe(
            map((value) => {
              const dailyInfo: DailyWeatherInfo[] = [];
              for (let i = 0; i < value.daily.time.length; i++) {
                dailyInfo.push({
                  minTemperature: value.daily.temperature_2m_min[i],
                  maxApparentTemperature:
                    value.daily.apparent_temperature_max[i],
                  minApparentTemperature:
                    value.daily.apparent_temperature_min[i],
                  maxTemperature: value.daily.temperature_2m_max[i],
                  date: new Date(value.daily.time[i]),
                  weatherCode: String(value.daily.weathercode[i]),
                  rainProbability: value.daily.rain_sum[i],
                  snowProbability: value.daily.snowfall_sum[i],
                  weatherImage:
                    'https://ssl.gstatic.com/onebox/weather/64/cloudy.png',
                });
              }
              this.loading.next(false)
              this.weatherInfoSubject.next(dailyInfo);
            })
          )
      })
    ).subscribe()
  }

  getCoordinates(city: string, country: string) {
    this.loading.next(true)
    return this.http
      .get<CoordinatesResponse[]>(`https://geocode.maps.co/search?q=${city}`)
      .pipe(
        catchError((error) => of(error)),
        map((coordinatesRawData) => {
          console.log();
          const coordinates: CoordinatesResponse | undefined =
            coordinatesRawData.find((element: any) =>
              element.display_name.includes(country)
            );
          if (typeof coordinates == 'undefined')
            throw new Error('City not found');
          return {
            longitude: Number(coordinates?.lon),
            latitude: Number(coordinates?.lat),
          };
        })
      );
  }
}

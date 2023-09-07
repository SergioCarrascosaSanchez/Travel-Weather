import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, of, throwError } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Coordinates } from './coordinates';
import { DailyWeatherInfo } from 'src/app/weather/daily-weather-info.model';

interface CoordinatesResponse {
  boundingbox: number[];
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  powered_by: string;
  type: string;
}

interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string;
    weathercode: string,
    temperature_2m_max: string;
    temperature_2m_min: string;
    apparent_temperature_max: string,
    apparent_temperature_min: string,
    precipitation_sum: string;
    rain_sum: string;
    snowfall_sum: string;
  };
  daily: {
    time: string[];
    weathercode: number[],
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    apparent_temperature_max: number[],
    apparent_temperature_min: number[],
    precipitation_sum: number[];
    rain_sum: number[];
    snowfall_sum: number[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getWeatherData(
    city: string,
    country: string,
    startDate: Date,
    endDate: Date
  ) {
    city = 'Madrid';
    country = 'Spain';
    startDate.setFullYear(startDate.getFullYear() - 1);
    endDate.setFullYear(endDate.getFullYear() - 1);

    return this.getCoordinates(city, country).pipe(
      take(1),
      switchMap((coordinates: Coordinates) => {
        return this.http.get<WeatherResponse>(
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
        ).pipe(map(
          value => {
            const dailyInfo : DailyWeatherInfo = {
              minTemperature: value.daily.temperature_2m_min[0],
              maxApparentTemperature: value.daily.apparent_temperature_max[0],
              minApparentTemperature: value.daily.apparent_temperature_min[0],
              maxTemperature : value.daily.temperature_2m_max[0],
              date: new Date(),
              weatherCode: String(value.daily.weathercode[0]),
              rainProbability: value.daily.rain_sum[0],
              snowProbability: value.daily.snowfall_sum[0],
              weatherImage: "https://ssl.gstatic.com/onebox/weather/64/cloudy.png"
            };
            return dailyInfo
          }
        ));
      })
    );
  }

  getCoordinates(city: string, country: string) {
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

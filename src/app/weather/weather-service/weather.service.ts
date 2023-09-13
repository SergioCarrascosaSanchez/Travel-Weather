import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, forkJoin, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Coordinates } from './coordinates';
import { DailyWeatherInfo } from 'src/app/weather/daily-weather-info.model';
import { WeatherResponse } from './weather-response.model';
import { CoordinatesResponse } from './coordinates-response.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  weatherInfoChanged: Subject<DailyWeatherInfo[]> = new Subject<
    DailyWeatherInfo[]
  >();
  weatherInfo: DailyWeatherInfo[] = [];
  weatherDetailsInfo: Subject<DailyWeatherInfo> =
    new Subject<DailyWeatherInfo>();

  private numberOfYears = 10;

  constructor(private http: HttpClient) {}

  setWeatherInfo(newWeatherInfo: DailyWeatherInfo[]) {
    this.weatherInfo = newWeatherInfo;
    this.weatherInfoChanged.next([...newWeatherInfo]);
  }

  getWeatherInfo() {
    return [...this.weatherInfo];
  }

  getSpecificWeatherInfo(index: number) {
    return this.weatherInfo[index];
  }

  fetchWeatherData(city: string, startDate: Date, endDate: Date) {
    const responses: DailyWeatherInfo[][] = [];

    return this.getCoordinates(city).pipe(
      switchMap((coordinatesData) => {
        return forkJoin(
          this.getYearsArray().map((year) => {
            startDate.setFullYear(year);
            endDate.setFullYear(year);

            return this.getWeatherData(
              coordinatesData.latitude,
              coordinatesData.longitude,
              startDate,
              endDate
            ).pipe(
              catchError((error) => {
                // Manejar errores si es necesario
                console.error('Error en solicitud HTTP:', error);
                return of(null);
              }),
              map((value: WeatherResponse) => {
                const processedResponse: DailyWeatherInfo[] = [];
                for (let i = 0; i < value.daily.time.length; i++) {
                  processedResponse.push(
                    this.transformWeatherResponseToWeatherInfo(value, i)
                  );
                }
                responses.push(processedResponse);
                return processedResponse;
              })
            );
          })
        ).pipe(
          map(() => this.getAverageProcessedData(responses)),
          tap((info: DailyWeatherInfo[]) => {
            this.loading.next(false);
            this.setWeatherInfo(info);
          })
        );
      })
    );
  }

  private getCoordinates(city: string) {
    this.loading.next(true);
    return this.http
      .get<CoordinatesResponse[]>(`https://geocode.maps.co/search?q=${city}`)
      .pipe(
        catchError((error) => of(error)),
        map((coordinatesRawData: CoordinatesResponse[]) => {
          const coordinates = coordinatesRawData[0];
          return {
            longitude: Number(coordinates?.lon),
            latitude: Number(coordinates?.lat),
          };
        })
      );
  }

  private getWeatherData(
    latitude: number,
    longitude: number,
    startDate: Date,
    endDate: Date
  ) {
    return this.http.get<WeatherResponse>(
      `https://archive-api.open-meteo.com/v1/era5?latitude=${latitude}&longitude=${longitude}&timezone=GMT&start_date=${startDate
        .toISOString()
        .substring(0, 10)}&end_date=${endDate
        .toISOString()
        .substring(
          0,
          10
        )}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,snowfall_sum,,apparent_temperature_max,apparent_temperature_min,weathercode`
    );
  }

  private transformWeatherResponseToWeatherInfo(
    response: WeatherResponse,
    i: number
  ): DailyWeatherInfo {
    return {
      minTemperature: response.daily.temperature_2m_min[i],
      maxApparentTemperature: response.daily.apparent_temperature_max[i],
      minApparentTemperature: response.daily.apparent_temperature_min[i],
      maxTemperature: response.daily.temperature_2m_max[i],
      date: new Date(response.daily.time[i]),
      weatherCode: String(response.daily.weathercode[i]),
      rainProbability: response.daily.rain_sum[i],
      snowProbability: response.daily.snowfall_sum[i],
      weatherImage: this.setWeatherImage(response.daily.weathercode[i]),
    };
  }

  private getAverageProcessedData(
    dailyWeatherInfoArray: DailyWeatherInfo[][]
  ): DailyWeatherInfo[] {
    const numberOfDays = dailyWeatherInfoArray[0].length;
    const initialDate = dailyWeatherInfoArray[0][0].date;
    let responseArray: DailyWeatherInfo[] = this.populateAveragesArray(
      numberOfDays,
      initialDate
    );
    let weatherCodeAppearenceMap = {};
    for (let i = 0; i < numberOfDays; i++) {
      const currentDate = new Date(initialDate);
      currentDate.setDate(initialDate.getDate() + i);
      weatherCodeAppearenceMap[currentDate.getDate()] = {};
    }
    for (let i = 0; i < responseArray.length; i++) {
      for (let j = 0; j < dailyWeatherInfoArray.length; j++) {
        responseArray[i].maxApparentTemperature =
          responseArray[i].maxApparentTemperature +
          dailyWeatherInfoArray[j][i].maxApparentTemperature;

        responseArray[i].maxTemperature =
          responseArray[i].maxTemperature +
          dailyWeatherInfoArray[j][i].maxTemperature;

        responseArray[i].minTemperature =
          responseArray[i].minTemperature +
          dailyWeatherInfoArray[j][i].minTemperature;

        responseArray[i].minApparentTemperature =
          responseArray[i].minApparentTemperature +
          dailyWeatherInfoArray[j][i].minApparentTemperature;

        responseArray[i].snowProbability =
          responseArray[i].snowProbability +
          dailyWeatherInfoArray[j][i].snowProbability;

        responseArray[i].rainProbability =
          responseArray[i].rainProbability +
          dailyWeatherInfoArray[j][i].rainProbability;

        if (
          weatherCodeAppearenceMap[dailyWeatherInfoArray[j][i].date.getDate()][
            dailyWeatherInfoArray[j][i].weatherCode
          ] == null
        ) {
          weatherCodeAppearenceMap[dailyWeatherInfoArray[j][i].date.getDate()][
            dailyWeatherInfoArray[j][i].weatherCode
          ] = 1;
        } else {
          weatherCodeAppearenceMap[dailyWeatherInfoArray[j][i].date.getDate()][
            dailyWeatherInfoArray[j][i].weatherCode
          ] =
            weatherCodeAppearenceMap[
              dailyWeatherInfoArray[j][i].date.getDate()
            ][dailyWeatherInfoArray[j][i].weatherCode] + 1;
        }
      }
    }
    return this.getAverages(responseArray, weatherCodeAppearenceMap);
  }

  private getAverages(
    weatherInfoArray: DailyWeatherInfo[],
    weatherCodeMap: Object
  ) {
    return weatherInfoArray.map((element) => {
      element.maxApparentTemperature = Number(
        (element.maxApparentTemperature / this.numberOfYears).toFixed(1)
      );
      element.minApparentTemperature = Number(
        (element.minApparentTemperature / this.numberOfYears).toFixed(1)
      );
      element.maxTemperature = Number(
        (element.maxTemperature / this.numberOfYears).toFixed(1)
      );
      element.minTemperature = Number(
        (element.minTemperature / this.numberOfYears).toFixed(1)
      );
      element.snowProbability = Number(
        (element.snowProbability / this.numberOfYears).toFixed(2)
      );
      element.rainProbability = Number(
        (element.rainProbability / this.numberOfYears).toFixed(2)
      );
      element.weatherCode = this.setWeatherCode(
        weatherCodeMap[element.date.getDate()]
      );
      element.weatherImage = this.setWeatherImage(Number(element.weatherCode));
      return element;
    });
  }

  private setWeatherCode(elementObject) {
    let maxValue = -Infinity;
    let resultCode = null;
    Object.keys(elementObject).forEach((weatherCode) => {
      if (elementObject[weatherCode] > maxValue) {
        maxValue = elementObject[weatherCode];
        resultCode = weatherCode;
      }
    });
    return resultCode;
  }
  private setWeatherImage(code: number) {
    if (code === 0 || code === 1) {
      return 'https://ssl.gstatic.com/onebox/weather/64/sunny.png';
    }
    if (code === 2 || code === 3)
      return 'https://ssl.gstatic.com/onebox/weather/64/cloudy.png';
    if (code >= 40 && code < 50)
      return 'https://ssl.gstatic.com/onebox/weather/64/fog.png';
    if ((code >= 50 && code < 70) || (code >= 80 && code < 85))
      return 'https://ssl.gstatic.com/onebox/weather/64/rain.png';
    if ((code >= 70 && code < 80) || (code >= 85 && code < 90))
      return 'https://ssl.gstatic.com/onebox/weather/64/snow.png';
    if (code >= 90 && code < 100)
      return 'https://ssl.gstatic.com/onebox/weather/64/thunderstorms.png';
    return null;
  }

  private populateAveragesArray(
    days: number,
    initialDate: Date
  ): DailyWeatherInfo[] {
    const initialAveragesArray = [];
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(initialDate);
      currentDate.setDate(initialDate.getDate() + i);
      initialAveragesArray.push({
        minTemperature: 0,
        maxApparentTemperature: 0,
        minApparentTemperature: 0,
        maxTemperature: 0,
        date: currentDate,
        weatherCode: 0,
        rainProbability: 0,
        snowProbability: 0,
        weatherImage: '',
      });
    }
    return initialAveragesArray;
  }
}

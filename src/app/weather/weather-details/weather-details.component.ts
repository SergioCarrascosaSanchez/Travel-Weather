import { Component, Input } from '@angular/core';
import { DailyWeatherInfo } from 'src/app/weather/daily-weather-info.model';
import { WeatherService } from '../weather-service/weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css'],
})
export class WeatherDetailsComponent {
  weatherDetails: DailyWeatherInfo = {
    date: new Date(),
    weatherCode: 'Cloudy',
    weatherImage: 'https://ssl.gstatic.com/onebox/weather/64/cloudy.png',
    maxTemperature: 41.2,
    maxApparentTemperature: 38.2,
    minTemperature: 13.4,
    minApparentTemperature: 20.3,
    snowProbability: 0.0,
    rainProbability: 0.1,
  };

  weatherDetailsArray: { key: string; value: number | Date | string }[] = [];

  constructor(private weatherService: WeatherService) {
    this.weatherService.weatherDetailsInfo.subscribe(
      (newWeatherDetailsInfo) => {
        this.weatherDetailsArray = this.processDailyWeatherInfoToArray(
          newWeatherDetailsInfo
        );
      }
    );
  }

  processDailyWeatherInfoToArray(
    weatherDetails: DailyWeatherInfo
  ): { key: string; value: Date | number | string }[] {
    return [
      { key: 'Max Temperature', value: weatherDetails.maxTemperature },
      {
        key: 'Max apparent Temperature',
        value: weatherDetails.maxApparentTemperature,
      },
      { key: 'Min Temperature', value: weatherDetails.minTemperature },
      {
        key: 'Min apparent Temperature',
        value: weatherDetails.minApparentTemperature,
      },
      {
        key: 'Rain probability',
        value: weatherDetails.rainProbability,
      },
      {
        key: 'Snow probability',
        value: weatherDetails.snowProbability,
      },
    ];
  }
}

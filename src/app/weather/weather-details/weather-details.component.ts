import { Component, OnInit } from '@angular/core';
import { DailyWeatherInfo } from 'src/app/weather/daily-weather-info.model';
import { WeatherService } from '../weather-service/weather.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css'],
})
export class WeatherDetailsComponent implements OnInit {
  weatherDetails: DailyWeatherInfo = null;

  weatherDetailsArray: { key: string; value: number | Date | string }[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.weatherDetailsInfo.subscribe(
      (newWeatherDetailsInfo: DailyWeatherInfo) => {
        this.weatherDetailsArray = this.processDailyWeatherInfoToArray(
          newWeatherDetailsInfo
        );
        this.weatherDetails = newWeatherDetailsInfo;
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

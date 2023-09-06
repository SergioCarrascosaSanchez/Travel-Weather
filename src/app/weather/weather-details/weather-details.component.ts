import { Component, Input } from '@angular/core';
import { DailyWeatherInfo } from 'src/app/shared/daily-weather-info.model';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css'],
})
export class WeatherDetailsComponent {
  @Input() weatherDetails: DailyWeatherInfo = {
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

  weatherDetailsArray: { key: string; value: number }[] = [];

  constructor() {
    this.weatherDetailsArray = [
      { key: 'Max Temperature', value: this.weatherDetails.maxTemperature },
      {
        key: 'Max apparent Temperature',
        value: this.weatherDetails.maxApparentTemperature,
      },
      { key: 'Min Temperature', value: this.weatherDetails.minTemperature },
      {
        key: 'Min apparent Temperature',
        value: this.weatherDetails.minApparentTemperature,
      },
      {
        key: 'Rain probability',
        value: this.weatherDetails.rainProbability,
      },
      {
        key: 'Snow probability',
        value: this.weatherDetails.snowProbability,
      },
    ];
  }
}

import { Component, OnInit } from '@angular/core';
import { DailyWeatherInfo } from 'src/app/weather/daily-weather-info.model';
import { WeatherService } from '../../weather-service/weather.service';

@Component({
  selector: 'app-weather-card-list',
  templateUrl: './weather-card-list.component.html',
  styleUrls: ['./weather-card-list.component.css'],
})
export class WeatherCardListComponent implements OnInit {
  constructor(private weatherService: WeatherService) {}
  weatherInfoArray: DailyWeatherInfo[];

  ngOnInit(): void {
    this.weatherService.weatherInfoObservable.subscribe((info) => {
      this.weatherInfoArray = info != null ? info : [];
    });
  }

  /*weatherInfoArray: DailyWeatherInfo[] = [
    {
      date: new Date(),
      weatherCode: 'Sunny',
      weatherImage: 'https://ssl.gstatic.com/onebox/weather/64/sunny.png',
      maxTemperature: 41.2,
      maxApparentTemperature: 38.2,
      minTemperature: 13.4,
      minApparentTemperature: 20.3,
      snowProbability: 0.0,
      rainProbability: 0.1,
    },
    {
      date: new Date(),
      weatherCode: 'Cloudy',
      weatherImage: 'https://ssl.gstatic.com/onebox/weather/64/cloudy.png',
      maxTemperature: 41.2,
      maxApparentTemperature: 38.2,
      minTemperature: 13.4,
      minApparentTemperature: 20.3,
      snowProbability: 0.0,
      rainProbability: 0.1,
    },
    {
      date: new Date(),
      weatherCode: 'Rainy',
      weatherImage: 'https://ssl.gstatic.com/onebox/weather/64/rain.png',
      maxTemperature: 41.2,
      maxApparentTemperature: 38.2,
      minTemperature: 13.4,
      minApparentTemperature: 20.3,
      snowProbability: 0.0,
      rainProbability: 0.1,
    },
    {
      date: new Date(),
      weatherCode: 'Rainy',
      weatherImage: 'https://ssl.gstatic.com/onebox/weather/64/snow.png',
      maxTemperature: 41.2,
      maxApparentTemperature: 38.2,
      minTemperature: 13.4,
      minApparentTemperature: 20.3,
      snowProbability: 0.0,
      rainProbability: 0.1,
    },
    {
      date: new Date(),
      weatherCode: 'Rainy',
      weatherImage: 'https://ssl.gstatic.com/onebox/weather/64/fog.png',
      maxTemperature: 41.2,
      maxApparentTemperature: 38.2,
      minTemperature: 13.4,
      minApparentTemperature: 20.3,
      snowProbability: 0.0,
      rainProbability: 0.1,
    },
    {
      date: new Date(),
      weatherCode: 'Rainy',
      weatherImage: 'https://ssl.gstatic.com/onebox/weather/64/snow.png',
      maxTemperature: 41.2,
      maxApparentTemperature: 38.2,
      minTemperature: 13.4,
      minApparentTemperature: 20.3,
      snowProbability: 0.0,
      rainProbability: 0.1,
    },
    {
      date: new Date(),
      weatherCode: 'Rainy',
      weatherImage: 'https://ssl.gstatic.com/onebox/weather/64/fog.png',
      maxTemperature: 41.2,
      maxApparentTemperature: 38.2,
      minTemperature: 13.4,
      minApparentTemperature: 20.3,
      snowProbability: 0.0,
      rainProbability: 0.1,
    },
  ];*/
}

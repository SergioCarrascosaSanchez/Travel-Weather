import { Component, Input } from '@angular/core';
import { DailyWeatherInfo } from 'src/app/shared/daily-weather-info.model';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent {
  @Input() weatherDetails: DailyWeatherInfo = {
    date : new Date(),
    weatherCode: "Cloudy",
    weatherImage: "https://ssl.gstatic.com/onebox/weather/64/cloudy.png",
    maxTemperature: 41.2,
    maxApparentTemperature: 38.2,
    minTemperature: 13.4,
    minApparentTemperature: 20.3,
    snowProbability: 0.0,
    rainProbability: 0.1,
  }
}

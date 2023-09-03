import { Component } from '@angular/core';
import { flagNames } from './flag-names';
import { WeatherService } from '../weather/weather-service/weather.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  constructor(
    private weatherService: WeatherService
  ) {}

  inputCity: string = '';
  inputCountry: string = '';
  flagNames = flagNames;
  startDate: string;
  endDate: string;

  onSubmit() {
    this.weatherService
      .getWeatherData('', '', new Date(this.startDate), new Date(this.endDate))
      .subscribe((resData) => {
        console.log(resData.daily.temperature_2m_min);
      });
  }
}

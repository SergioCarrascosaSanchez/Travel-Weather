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
    this.weatherInfoArray = this.weatherService.getWeatherInfo();
    this.weatherService.weatherInfoChanged.subscribe((newInfo) => {
      this.weatherInfoArray = newInfo;
    });
  }
}

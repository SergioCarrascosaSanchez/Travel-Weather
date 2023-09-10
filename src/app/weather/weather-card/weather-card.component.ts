import { Component, Input } from '@angular/core';
import { DailyWeatherInfo } from 'src/app/weather/daily-weather-info.model';
import { WeatherService } from '../weather-service/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
})
export class WeatherCardComponent {
  constructor(private weatherService: WeatherService) {}

  @Input() weatherInfo: DailyWeatherInfo;
  @Input() index: number;

  onClick() {
    this.weatherService.weatherDetailsInfo.next(
      this.weatherService.getSpecificWeatherInfo(this.index)
    );
  }
  //URL de github con los codigos de tiempo e incluso links a imagenes
  //https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c
}

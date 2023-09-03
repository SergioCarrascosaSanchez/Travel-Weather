import { Component, Input } from '@angular/core';
import { DailyWeatherInfo } from 'src/app/shared/daily-weather-info.model';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent {

  @Input() weatherInfo : DailyWeatherInfo

  /*date: Date = new Date()
  day = this.date.getDate()
  month = this.date.getMonth() + 1
  averageMaxTemperature: number = 32.0
  averageMinTemperature: number = 14.3
  weatherCode: string = "https://ssl.gstatic.com/onebox/weather/64/cloudy.png";
  weatherCode2: string = "http://openweathermap.org/img/wn/03d@2x.png"
*/
  //URL de github con los codigos de tiempo e incluso links a imagenes
  //https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c
}

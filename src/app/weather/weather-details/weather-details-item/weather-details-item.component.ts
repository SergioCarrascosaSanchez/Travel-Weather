import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-details-item',
  templateUrl: './weather-details-item.component.html',
  styleUrls: ['./weather-details-item.component.css']
})
export class WeatherDetailsItemComponent {
  @Input() item
  @Input() value
}

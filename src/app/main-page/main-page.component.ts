import { Component, OnDestroy, OnInit } from '@angular/core';
import { flagNames } from './flag-names';
import { WeatherService } from '../weather/weather-service/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  constructor(private weatherService: WeatherService) {}

  loading: boolean;
  loadingSuscription : Subscription

  inputCity: string = '';
  startDate: string;
  endDate: string;

  onSubmit() {
    this.weatherService
      .fetchWeatherData(this.inputCity, new Date(this.startDate), new Date(this.endDate)).subscribe()
  }

  ngOnInit(): void {
   this.loadingSuscription = this.weatherService.loading.subscribe((value) => (this.loading = value));
  }

  ngOnDestroy(): void {
    this.loadingSuscription.unsubscribe()
  }
}

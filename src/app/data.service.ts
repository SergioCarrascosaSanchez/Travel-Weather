import { Injectable } from '@angular/core';
import { WeatherInfoService } from './weather-info.service';
import { CoordinatesService } from './coordinates.service';
import { Coordinates } from './coordinates';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private weatherInfoService: WeatherInfoService,
    private coordinatesService: CoordinatesService
  ) {}

  getData(city: string, country: string, startDate: Date, endDate: Date) : Observable<any>{
    return this.coordinatesService.transformToCoordinates(city).pipe(
      switchMap((coordinatesData: any) => {
        const element: any = coordinatesData.find((element: any) =>
          element.display_name.includes(country)
        );
        return this.weatherInfoService.getWeatherData(
          { longitude: element.lon, latitude: element.lat },
          startDate,
          endDate
        );
      })
    );
  }
}

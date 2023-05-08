import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {

  constructor(private http: HttpClient) { }

  URL = "https://geocode.maps.co/search?q="

  transformToCoordinates(city: string) {
    return this.http.get(`${this.URL}${city}`);
  }
}

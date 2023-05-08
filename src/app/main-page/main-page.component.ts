import { Component } from '@angular/core';
import { flagNames } from '../flag-names';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  inputCity: string = '';
  inputCountry: string = '';
  flagNames = flagNames;
  startDate: Date;
  endDate: Date;

  onSubmit() {
    console.log(this.inputCity);
    console.log(this.inputCountry);
    console.log(this.startDate);
    console.log(this.endDate);
  }
}

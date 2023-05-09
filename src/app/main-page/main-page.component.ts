import { Component } from '@angular/core';
import { flagNames } from '../flag-names';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  constructor(private dataService: DataService) {}

  inputCity: string = '';
  inputCountry: string = '';
  flagNames = flagNames;
  startDate: Date;
  endDate: Date;

  onSubmit() {
    console.log(
      this.dataService
        .getData(
          this.inputCity,
          this.inputCountry,
          this.startDate,
          this.endDate
        )
        .subscribe((data) => console.log(data))
    );
  }
}

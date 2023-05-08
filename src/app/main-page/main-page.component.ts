import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  inputText: string = '';
  initialDate: Date;
  finalDate: Date;

  onSubmit() {
    console.log(this.inputText);
  }
}

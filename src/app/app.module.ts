import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherCardComponent } from './weather/weather-card/weather-card.component';
import { WeatherCardListComponent } from './weather/weather-card/weather-card-list/weather-card-list.component';
import { WeatherDetailsComponent } from './weather/weather-details/weather-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    WeatherCardComponent,
    WeatherCardListComponent,
    WeatherDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeatherForecastPageRoutingModule } from './weather-forecast-routing.module';

import { WeatherForecastPage } from './weather-forecast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeatherForecastPageRoutingModule
  ],
  declarations: [WeatherForecastPage]
})
export class WeatherForecastPageModule {}

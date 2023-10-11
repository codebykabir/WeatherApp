import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentWeatherPageRoutingModule } from './current-weather-routing.module';

import { CurrentWeatherPage } from './current-weather.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentWeatherPageRoutingModule
  ],
  declarations: [CurrentWeatherPage]
})
export class CurrentWeatherPageModule {}

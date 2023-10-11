import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherForecastPage } from './weather-forecast.page';

const routes: Routes = [
  {
    path: '',
    component: WeatherForecastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherForecastPageRoutingModule {}

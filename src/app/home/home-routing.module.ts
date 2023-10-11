import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'current-weather',
        loadChildren: () => import('./../Pages/current-weather/current-weather.module').then(m => m.CurrentWeatherPageModule)
      },
      {
        path: 'weather-forecast',
        loadChildren: () => import('./../Pages/weather-forecast/weather-forecast.module').then(m => m.WeatherForecastPageModule)
      },
      
      {
        path: '',
        redirectTo: '/home/current-weather',
        pathMatch: 'full'
      }
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

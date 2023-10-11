import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { ShareService } from '../CustomClasses/share.service';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  weatherController: any;
  geoApiController: any;
  foreCastController:any;
  WeatherAPI: any = 'weather';
  getCityLatLong: any = 'direct'
  getForecast: any = 'forecast.json'
  constructor(public http: HttpClient,
    public share: ShareService
    ) { 
      this.weatherController = share.baseUrl+'data/2.5';
      this.geoApiController = share.baseUrl+'geo/1.0'
      this.foreCastController = 'https://api.weatherapi.com/v1'
    }



  ExecuteGet(controllerName:any, serviceName:any, data:any) {
    console.log(data)
    return new Promise((resolve, reject) => {
      let url = controllerName + '/' + serviceName;
      //console.log(url);
      this.http.get(controllerName + '/' + serviceName+'?'+data)
        
        .subscribe(data => {
          data;
          resolve(data);

        }, (err) => {
          reject(err);
        });
    });
  }

}

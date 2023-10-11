import { Component } from '@angular/core';
import { ShareService } from '../CustomClasses/share.service';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  serviceResponse: any;
  currentWeather : any
  constructor(public share : ShareService,
    public commonService : CommonService
    ) {
    share.GetCurrentLocation();
  }

  ionViewWillEnter() {
    this.getCurrentWeatherData();
  }

  getCurrentWeatherData() {
    //Pass param in body
    let params = 'lat='+this.share.currentLat+'&lon='+this.share.currentLong+'&appid=8e0235de83b1aec309897e7c6652f700'
    try {

      let controllerName = this.commonService.weatherController;
      let serviceName = this.commonService.WeatherAPI;
      let apiType = "ExecuteGet";//set type as calling function
      this.commonService.ExecuteGet(
        controllerName,//controller name
        serviceName,//service name
        params).then((result) => {
          this.serviceResponse = result;

          console.log('Weather : ', this.serviceResponse)
          if (this.serviceResponse.cod ==200) {
                console.log(this.serviceResponse);
                this.currentWeather =this.serviceResponse;
            
          }
          else {
            alert(this.serviceResponse.ErrorMessage)
          }
        }, (err) => {
          alert(err)

        }).catch((error) => {
          alert(error)

        });

    } catch (error) {
      
      alert(error)
    }


  }

  // Convert Kelvin to celsius
  getCelsius(temp:any){
    let tepmrature = temp-273.15;
    tepmrature = parseFloat(tepmrature.toFixed(2))
    return tepmrature;
  }
  getVisibility(v:any){
    let visibility = v/1000
    return visibility;
  }
}

import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/CustomClasses/share.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.page.html',
  styleUrls: ['./weather-forecast.page.scss'],
})
export class WeatherForecastPage implements OnInit {
  serviceResponse: any;
  iconUrl: any;
  forecastApiKey: any = 'ccf5416125644acd80b121219231110';
  forecastData:any;
  checkChar: any='.';
  isLoading:boolean = false;
  constructor(
    public share : ShareService,
    public commonService : CommonService
    ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.gettWeatherForecastData()
  }


  gettWeatherForecastData() {
    //Pass param in body
    this.isLoading = true;
    console.log('Locatio', this.share.currentLat, this.share.currentLong)
    if(!this.share.currentLat){
      alert('Location permission required, or enable location');
      this.share.GetCurrentLocation();
      setTimeout(() => {},5000)
      return;
    }
    let params = 'key='+this.forecastApiKey+'&q='+this.share.currentLat+','+this.share.currentLong+'&days=7';
    try {

      let controllerName = this.commonService.foreCastController;
      let serviceName = this.commonService.getForecast;
      let apiType = "ExecuteGet";//set type as calling function
      this.commonService.ExecuteGet(
        controllerName,//controller name
        serviceName,//service name
        params).then((result) => {
          this.serviceResponse = result;
          this.isLoading = false;
          console.log('Weather : ', this.serviceResponse)
          this.forecastData = this.serviceResponse
          console.log(this.serviceResponse);
           
        }, (err) => {
          this.isLoading = false;
          console.log('1', err.error.error)
          alert(err.error.error.message)

        }).catch((error) => {
          this.isLoading = false;
          console.log('2', error)
          alert('Something Went Wrong, Please check internet connection')

        });

    } catch (error) {
      this.isLoading = false;
      console.log('3', error)
      alert('Something Went Wrong, Please check internet connection')
    }
  }

  getDayName(fDate:any){
    // console.log(fDate.includes('-'));
    let date = new Date(fDate); 
    let dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    
    dayName = dayName.substring(0, 3).toUpperCase()
    return dayName;
  }

}

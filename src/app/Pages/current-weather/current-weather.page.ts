import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/CustomClasses/share.service';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.page.html',
  styleUrls: ['./current-weather.page.scss'],
})
export class CurrentWeatherPage implements OnInit {

  serviceResponse: any;
  currentWeather : any
  isSearchBar : boolean= false;
  isSearchView : boolean= false;
  cityList: any;
  iconUrl : any;
  isLoading: boolean = false;

  constructor(
    public share : ShareService,
    public commonService : CommonService,
    public dtr: ChangeDetectorRef
    ) {
    share.GetCurrentLocation();
  }

  ngOnInit() {
    
  }
  ionViewWillEnter() {
    // if(this.share.currentLat)
    this.getCurrentWeatherData();
  }

  searchClick(){
    console.log('searchbar: ', this.isSearchBar)
    this.isSearchBar = true;
    
  }

  ClickOnSearchClose(){
    this.isSearchBar = false;
    this.isSearchView = false;
  }

  onChangeCity(city:any){
    this.share.currentLat =city.lat;
    this.share.currentLong =city.lon;
    this.getCurrentWeatherData()
  }

  getCityName(e:any){
    console.log(e)
    if (e.target.value.length == 0) {
      this.isSearchView = false;
    }
    else if(e.target.value.length >=3){
      this.isSearchView = true;
      let params = 'q='+e.target.value+'&limit='+5+'&appid=8e0235de83b1aec309897e7c6652f700'
    try {

      let controllerName = this.commonService.geoApiController;
      let serviceName = this.commonService.getCityLatLong;
      let apiType = "ExecuteGet";//set type as calling function
      this.commonService.ExecuteGet(
        controllerName,//controller name
        serviceName,//service name
        params).then((result) => {
          this.serviceResponse = result;

          console.log('Weather : ', this.serviceResponse)
                console.log(this.serviceResponse);
                this.cityList =this.serviceResponse;
                this.dtr.detectChanges();
            
          
          
        }, (err) => {
          alert(err.error.message)

        }).catch((error) => {
          alert('Something Went Wrong, Please check internet connection')

        });

    } catch (error) {
      
      alert('Something Went Wrong, Please check internet connection')
    }
    }

  }
  getMylocationWeather(){
    this.share.GetCurrentLocation();
    this.getCurrentWeatherData();
  }

  getCurrentWeatherData() {
    //Pass param in body
    this.isLoading = true;
    this.isSearchView = false;
    this.isSearchBar = false;
    if(!this.share.currentLat){
      alert('Location permission required, or enable location');
      this.share.GetCurrentLocation();
      setTimeout(() => {},5000)
      return;
    }
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
          this.isLoading = false;
          console.log('Weather : ', this.serviceResponse)
          if (this.serviceResponse.cod ==200) {
                console.log(this.serviceResponse);
                this.currentWeather =this.serviceResponse;
                this.iconUrl = 'https://openweathermap.org/img/wn/'+ this.currentWeather?.weather?.[0]?.icon +'@4x.png'
                console.log('icon URl : ', this.iconUrl)
                this.dtr.detectChanges();
            
          }
          else{
            alert(this.serviceResponse.message)
          }
          
        }, (err) => {
          this.isLoading = false;
          console.log('1', err)
          if(err.status ===0){
            alert('Something Went Wrong, Please check internet connection')
          }
          else
          alert(err.error.message)

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

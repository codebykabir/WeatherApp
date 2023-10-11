import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';


@Injectable({
  providedIn: 'root'
})


export class ShareService {
  serviceTimeOut: any = 1000 * 60 * 1//1 min.. if service taking long time
  currentLat: any;
  currentLong: any;
  baseUrl: any;

  constructor() { 
    this.baseUrl = 'https://api.openweathermap.org/';
  }

  async GetCurrentLocation(){
    try {
      const position = await Geolocation.getCurrentPosition();
      console.log('Current position:', position.coords.latitude, position.coords.longitude);
      this.currentLat = position.coords.latitude;
      this.currentLong = position.coords.longitude;
    } catch (error) {
      console.error('Error getting location', error);
    }
  }
  
}

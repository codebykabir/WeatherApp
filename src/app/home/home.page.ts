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
    // share.GetCurrentLocation();
  }

}

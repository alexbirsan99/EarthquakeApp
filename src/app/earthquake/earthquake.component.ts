import { Component, Input, OnInit } from '@angular/core';
import { MagnitudeColors } from '../utils/magnitudeColors';

@Component({
  selector: 'app-earthquake',
  templateUrl: './earthquake.component.html',
  styleUrls: ['./earthquake.component.css']
})

export class EarthquakeComponent implements OnInit {

  @Input()
  earthquake:any;

  magColors:MagnitudeColors;

  constructor() { 
    this.magColors = MagnitudeColors.getInstance();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit():void{
    
  }

  getMagColor() {
    const magColor = this.magColors.getMagColor(this.earthquake.properties.mag);
    return {
      "background-color": magColor.getColor(),
      "color": magColor.getTextColor()
    }
  }


  getDateString(time:string) {
    const date = new Date(time);
    return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
  }

  getTimeString(time:string) {
    const date = new Date(time);
    const hour = date.getHours() < 9? '0' + date.getHours(): date.getHours();
    const minutes = date.getMinutes() < 9? '0' + date.getMinutes(): date.getMinutes();
    return hour + ":" + minutes;
  }

  getMag(earthquakeMag:string):string {
    if(earthquakeMag) {
      const unit = earthquakeMag.toString().split(".")[0];
      var decimals = earthquakeMag.toString().split(".")[1];
      decimals? decimals = decimals.slice(1,3): null;
      const message = decimals? unit + "." + decimals:unit;
      return message;
    }
    return '?';
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';

import { SearchEarthquake } from '../objects/searchEarthquake';
import { EarthquakeUtils } from '../utils/earthquakeUtils';
import { SearchDialog } from '../utils/searchDialog';

import  * as $ from 'jquery';
import { ThemeChanger } from '../utils/themeChanger';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.css']
})
export class SearchDialogComponent implements OnInit {

  searchDialog:SearchDialog;

  earhquakeUtils: EarthquakeUtils;

  periodSearch:FormGroup;
  latitude:FormControl;
  longitude:FormControl;
  minMag:FormControl;
  maxMag:FormControl;

  maxDate:Date;

  searchEarthquake:SearchEarthquake;


  validLatLong:boolean = true;
  validMinMaxMag:boolean = true;
  sameDates:boolean = false;

  themeChanger:ThemeChanger;

  

  constructor() {
    this.searchDialog = SearchDialog.getInstance();
    this.earhquakeUtils = EarthquakeUtils.getInstance();

    this.searchEarthquake = this.earhquakeUtils.getSearchEarthquake();

    this.latitude = new FormControl('');
    this.longitude = new FormControl('');
    this.minMag = new FormControl('');
    this.maxMag = new FormControl('');

    this.periodSearch = new FormGroup({
      start: new FormControl(this.searchEarthquake.startDateUNIX),
      end: new FormControl(this.searchEarthquake.endDateUNIX),
    });
    this.maxDate = new Date();
    this.themeChanger = ThemeChanger.getInstance();
  }






  ngOnInit(): void {
    const periodStart = this.periodSearch.get("start");
    const periodEnd = this.periodSearch.controls['end'] as FormControl;

    periodStart?.valueChanges.subscribe(newVal => {
      this.searchEarthquake.startDateUNIX = newVal;
      this.searchEarthquake.startDate = this.earhquakeUtils.formatDate(new Date(newVal));
    });

    periodEnd?.valueChanges.subscribe(newVal => {
      this.searchEarthquake.endDateUNIX = newVal;
      this.searchEarthquake.endDate = this.earhquakeUtils.formatDate(new Date(newVal));
    });

    this.themeChanger.getThemeCode() === false? $(".cdk-overlay-container").addClass("dark-theme") : $(".cdk-overlay-container").addClass("light-theme");
  }

  ngAfterViewInit():void {
    
  }




  search():void {

    // convert dates
    const startDate = new Date(this.searchEarthquake.startDate).setHours(0, 0, 0);
    const endDate = new Date(this.searchEarthquake.endDate).setHours(0, 0, 0);
    this.sameDates = startDate === endDate;

    this.validLatLong = (!this.latitude.value || !this.longitude.value)
                        || (this.latitude.value <= 90 
                        && 
                        this.latitude.value >= -90
                        &&
                        this.longitude.value <= 90 
                        &&
                        this.longitude.value >= -90);
    
    this.minMag.value && this.maxMag.value ? this.validMinMaxMag = this.minMag.value <= this.maxMag.value : this.validMinMaxMag = true;

    if(this.validLatLong && this.validMinMaxMag && !this.sameDates) {
      this.earhquakeUtils.setSearchEarthquake(this.searchEarthquake);
      SearchDialog.getInstance().runCallBackFunction();
      this.searchDialog.closeDialog();
    }
  }

}

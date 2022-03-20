
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EarthquakeService } from '../services/earthquake.service';
import { EarthquakeUtils } from '../utils/earthquakeUtils';

import {MatDialog} from '@angular/material/dialog';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { SearchEarthquake } from '../objects/searchEarthquake';
import { SearchDialog } from '../utils/searchDialog';
import { BehaviorSubject, Observable } from 'rxjs';

import * as $ from 'jquery';
import { ThemeChanger } from '../utils/themeChanger';

@Component({
  selector: 'app-earthquake-list',
  templateUrl: './earthquake-list.component.html',
  styleUrls: ['./earthquake-list.component.css']
})
export class EarthquakeListComponent implements OnInit {

  public searchDialog:SearchDialog;

  earthquakeUtils:EarthquakeUtils;

  paginationLength:number = 0;

  pageEvent:PageEvent = {} as PageEvent;

  /**
   * -1 -> loading
   * 0 -> no earthquakes
   * 1 -> has earthquakes
   */
  hasEarthquakes:BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  themeChanger:ThemeChanger;


  constructor(private earthquakeService:EarthquakeService, private dialog:MatDialog) {
    this.earthquakeUtils = EarthquakeUtils.getInstance(this.earthquakeService);
    this.searchDialog = SearchDialog.getInstance(dialog, () => {
      this.earthquakeUtils.loadEarthquakes(0, 16, (hasEarthquakes:boolean) => {
        hasEarthquakes?this.hasEarthquakes.next(1):this.hasEarthquakes.next(0);
      });
      this.earthquakeUtils.loadPaginationLength();
    });
    const date = new Date(); 
    this.earthquakeUtils.loadEarthquakes(0, 16, (hasEarthquakes:boolean) => {
      hasEarthquakes?this.hasEarthquakes.next(1):this.hasEarthquakes.next(0);
    });
    this.earthquakeUtils.loadPaginationLength();

    this.themeChanger = ThemeChanger.getInstance();
  }

  ngOnInit(): void {
    this.loadTheme();
  }

  loadEarthquakes(event:PageEvent) {
    this.earthquakeUtils.loadEarthquakes(event.pageIndex, event.pageSize, (hasEarthquakes:boolean) => {
      hasEarthquakes?this.hasEarthquakes.next(1):this.hasEarthquakes.next(0);
    });
    return event;
  }

  loadTheme():void {
    const changeToLightTheme = () => {
      $(".dark-theme").removeClass("dark-theme").addClass("light-theme");
    };

    const changeToDarkTheme = () => {
      $(".light-theme").removeClass("light-theme").addClass("dark-theme");
    };

    this.themeChanger.getThemeCode() === false ? changeToDarkTheme() : changeToLightTheme();
  }

}

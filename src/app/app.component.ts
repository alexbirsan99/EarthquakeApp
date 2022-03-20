import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import { ThemeChanger } from './utils/themeChanger';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'earthquake';
  themeChanger:ThemeChanger;
  
  constructor(private router:Router) {
    this.themeChanger = ThemeChanger.getInstance();
  }

  ngOnInit():void {

  }


  changeTheme() {
    const changeToLightTheme = () => {
      $(".dark-theme").removeClass("dark-theme").addClass("light-theme");
      this.themeChanger.switchTheme();
    };

    const changeToDarkTheme = () => {
      $(".light-theme").removeClass("light-theme").addClass("dark-theme");
      this.themeChanger.switchTheme();
    };

    this.themeChanger.getThemeCode() === true ? changeToDarkTheme() : changeToLightTheme();
  }

  makeListActive():void {
    $(".list").addClass("active");
    $(".map").removeClass("active");

    $(".list-mobile").addClass("mobile-item-active");
    $(".map-mobile").removeClass("mobile-item-active");
  }

  makeMapActive():void{
    $(".map").addClass("active");
    $(".list").removeClass("active");

    $(".map-mobile").addClass("mobile-item-active");
    $(".list-mobile").removeClass("mobile-item-active");
  }
}

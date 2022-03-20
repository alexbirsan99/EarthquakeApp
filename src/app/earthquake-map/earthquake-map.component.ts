import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import * as L from 'leaflet';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';
import { EarthquakeService } from '../services/earthquake.service';
import { EarthquakeUtils } from '../utils/earthquakeUtils';
import { SearchDialog } from '../utils/searchDialog';



@Component({
  selector: 'app-earthquake-map',
  templateUrl: './earthquake-map.component.html',
  styleUrls: ['./earthquake-map.component.css']
})
export class EarthquakeMapComponent implements OnInit {

  public searchDialog:SearchDialog;

  private map: L.Map = {} as L.Map;

  private earthquakeUtils:EarthquakeUtils;

  private markers:any[] = [];

  constructor(private earthquakeService:EarthquakeService, private dialog:MatDialog) {
    this.searchDialog = SearchDialog.getInstance(dialog, () => {
      this.earthquakeUtils.loadAllEarthquakes(() => {
        this.removeMarkers();
        this.drawEarthquakeMarkers();
      });
    }); 
    this.earthquakeUtils = EarthquakeUtils.getInstance(this.earthquakeService);
  }

  ngOnInit(): void {
    this.buildMap();
    this.earthquakeUtils.loadAllEarthquakes(() => {
      this.drawEarthquakeMarkers();
    });

  }

  ngAfterViewInit():void {

  }

  buildMap(): void {
    this.map = new L.Map('map', {
      center: [0, 0],
      zoom: 2
    });

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  drawEarthquakeMarkers():void {
    this.earthquakeUtils.getAllEarthquakes().map(element => {
      const coords = element.geometry.coordinates;
      const marker = L.marker([coords[1], coords[0]] as L.LatLngExpression, {
        icon:L.icon({
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png',
          
        })
      });
      const popup = L.popup().setLatLng([coords[1], coords[0]] as L.LatLngExpression);
      popup.setContent(
        "<b>" + element.properties.place + "</b> <br/>" + 
        "Magnitude: " + element.properties.mag + "<br/>" +
        "Time: " + this.getTimeString(element.properties.mag) + "<br/>"+
        "<a target = '_blank' href = " + element.properties.url + "> See more on USGS </a>"
      )
      marker.bindPopup(popup);
      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  removeMarkers():void {
    this.markers.forEach((marker) => {
      this.map.removeLayer(marker);
    });
    this.markers = [];
  }

  getTimeString(time:string) {
    const date = new Date(time);
    const hour = date.getHours() < 9? '0' + date.getHours(): date.getHours();
    const minutes = date.getMinutes() < 9? '0' + date.getMinutes(): date.getMinutes();
    return hour + ":" + minutes;
  }

}

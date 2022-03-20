import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchEarthquake } from '../objects/searchEarthquake';

@Injectable({
  providedIn: 'root'
})
export class EarthquakeService {

  constructor(private http:HttpClient) { }

  getPaginationLength(searchEarthquake:SearchEarthquake) {
    var URL = 'https://earthquake.usgs.gov/fdsnws/event/1/count?format=geojson&starttime=' + searchEarthquake.startDate + '&endtime=' + searchEarthquake.endDate;
    searchEarthquake.minMag? URL = URL + '&minmagnitude=' + searchEarthquake.minMag:null;
    searchEarthquake.maxMag? URL = URL + '&maxmagnitude=' + searchEarthquake.maxMag:null;
    searchEarthquake.latitude? URL = URL + '&latitude=' + searchEarthquake.latitude:null;
    searchEarthquake.longitude? URL = URL + '&longitude=' + searchEarthquake.longitude:null;
    searchEarthquake.radius? URL = URL + '&maxradiuskm=' + searchEarthquake.radius:null;
    return this.http.get(URL);
  }

  getEarthquakes(limit:number, offset:number, searchEarthquake:SearchEarthquake) {
    const offSetString:string = offset != 0? '&offset=' + offset:'';
    var URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + searchEarthquake.startDate + '&endtime=' + searchEarthquake.endDate + '&limit=' + limit + offSetString;
    searchEarthquake.minMag? URL = URL + '&minmagnitude=' + searchEarthquake.minMag:null;
    searchEarthquake.maxMag? URL = URL + '&maxmagnitude=' + searchEarthquake.maxMag:null;
    searchEarthquake.latitude? URL = URL + '&latitude=' + searchEarthquake.latitude:null;
    searchEarthquake.longitude? URL = URL + '&longitude=' + searchEarthquake.longitude:null;
    searchEarthquake.radius? URL = URL + '&maxradiuskm=' + searchEarthquake.radius:null;
    return this.http.get(URL);
  }

  getAllEarthquakes(searchEarthquake:SearchEarthquake) {
    var URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + searchEarthquake.startDate + '&endtime=' + searchEarthquake.endDate;
    searchEarthquake.minMag? URL = URL + '&minmagnitude=' + searchEarthquake.minMag:null;
    searchEarthquake.maxMag? URL = URL + '&maxmagnitude=' + searchEarthquake.maxMag:null;
    searchEarthquake.latitude? URL = URL + '&latitude=' + searchEarthquake.latitude:null;
    searchEarthquake.longitude? URL = URL + '&longitude=' + searchEarthquake.longitude:null;
    searchEarthquake.radius? URL = URL + '&maxradiuskm=' + searchEarthquake.radius:null;
    console.log(URL);
    return this.http.get(URL);
  }
}

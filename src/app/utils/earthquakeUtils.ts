
import { SearchEarthquake } from "../objects/searchEarthquake";
import { EarthquakeService } from "../services/earthquake.service";

export class EarthquakeUtils {

    private static instance:EarthquakeUtils;

    private paginationLength:number = 0;

    private earthquakes:any[] = [];

    private allEarthquakes:any[] = [];

    private searchEarthquake:SearchEarthquake;

    private numberOfItems:number;

    constructor(private earthquakeService?:EarthquakeService) {
        var today = new Date();
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); 
        this.searchEarthquake = {
            startDateUNIX: yesterday,
            endDateUNIX: today,
            startDate: this.formatDate(yesterday),
            endDate: this.formatDate(today)
        };
        this.numberOfItems = 0;
    }

    public static getInstance(earthquakeService?:EarthquakeService) {
        if(!this.instance) {
            this.instance = new EarthquakeUtils(earthquakeService);
        }
        return this.instance;
    }

    public loadPaginationLength() {
        this.earthquakeService?.getPaginationLength(this.searchEarthquake).subscribe(
            (result: any) => {
                this.paginationLength = result.count
                return this.paginationLength;
            }
        );
    }

    public getPaginationLength() {
        return this.paginationLength;
    }

    public loadEarthquakes(pageIndex:number, numberOfItems?:number, callBack?:Function) {
        numberOfItems? this.numberOfItems = numberOfItems:null;
        const offset = this.numberOfItems * pageIndex;
        this.earthquakeService?.getEarthquakes(this.numberOfItems, offset, this.searchEarthquake).subscribe((result:any) => {
            this.earthquakes = result.features;
            callBack?callBack(this.earthquakes && this.earthquakes.length > 0):null;     
        });
    }

    public loadAllEarthquakes(callBack?:Function) {
        this.earthquakeService?.getAllEarthquakes(this.searchEarthquake).subscribe((result:any) => {
            this.allEarthquakes = result.features;
            callBack?callBack(this.earthquakes && this.earthquakes.length > 0):null;     
        });
    }

    public getEarthquakes():any[] {
        return this.earthquakes;
    }

    public getAllEarthquakes():any[] {
        return this.allEarthquakes;
    }

    public formatDate(date:Date):string {
        const month = date.getMonth() + 1;
        return date.getFullYear() + "-" + month + "-" + date.getDate();
    }

    public formatDateUNIX(dateString:string):number { 
        return Date.parse(dateString);
    }

    public getSearchEarthquake():SearchEarthquake {
        return this.searchEarthquake
    }

    public setSearchEarthquake(newSearchEarthquake:SearchEarthquake) {
        this.searchEarthquake = newSearchEarthquake;
    }
}
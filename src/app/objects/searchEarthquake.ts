

export interface SearchEarthquake {
    startDateUNIX: Date,
    endDateUNIX: Date,
    startDate: string,
    endDate: string,
    latitude?: number,
    longitude?: number,
    radius?:number,
    minMag?: number,
    maxMag?: number
    tsunami?: boolean
}
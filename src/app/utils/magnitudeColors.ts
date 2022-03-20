class MagnitudeColor {
    private color:string;
    private textColor:string;
    private minMag:number;
    private maxMag:number;

    public constructor(color:string, textColor:string, minMag:number, maxMag:number) {
        this.color = color;
        this.textColor = textColor;
        this.minMag = minMag;
        this.maxMag = maxMag;
    }

    public getColor():string {
        return this.color;
    }

    public getTextColor():string {
        return this.textColor;
    }

    public getMinMag():number {
        return this.minMag;
    }

    public getMaxMag():number {
        return this.maxMag;
    }
}

export class MagnitudeColors {
    private static instance: MagnitudeColors;

    private magColors:MagnitudeColor[] =
    [
        new MagnitudeColor("#00C853", "#000", 0, 1),
        new MagnitudeColor("#AEEA00", "#000", 1, 3),
        new MagnitudeColor("#FFD600", "#000", 4, 6),
        new MagnitudeColor("#FF6D00", "#000", 6, 8),
        new MagnitudeColor("#D84315", "#000", 8, Number.MAX_VALUE)
    ]

    public constructor() {

    }

    public static getInstance():MagnitudeColors {
        if(!this.instance) {
            this.instance = new MagnitudeColors();
        }
        return this.instance;
    }

    public getMagColor(mag:number):MagnitudeColor {
        var magColor;
        this.magColors.forEach(element => {
            element.getMinMag()<= mag && element.getMaxMag() >= mag?magColor = element:null;
        });
        !magColor?magColor = this.magColors[0]:null;
        return magColor;
    }
}
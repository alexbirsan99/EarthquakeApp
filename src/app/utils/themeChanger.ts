export class ThemeChanger {

    private static instance:ThemeChanger;

    /* 
    true -> light theme
    false -> dark theme
    */
    private themeCode:boolean;

    constructor() {
        this.themeCode = true;
    }
    
    public static getInstance():ThemeChanger {
        if(!this.instance) {
            this.instance = new ThemeChanger();
        }
        return this.instance;
    }


    public getThemeCode():boolean {
        return this.themeCode;
    }

    public switchTheme():void {
        this.themeCode = !this.themeCode;
    }

}
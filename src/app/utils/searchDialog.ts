import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SearchDialogComponent } from "../search-dialog/search-dialog.component";

export class SearchDialog {

    private static searchDialog:SearchDialog; 

    dialogRef?:MatDialogRef<SearchDialogComponent>;

    private static callBackSearch:Function;

    constructor(private dialog?:MatDialog, private callBackSearch?:Function) {
        this.dialogRef = {} as MatDialogRef<SearchDialogComponent>;
        this.callBackSearch = callBackSearch;
    }

    public static getInstance(dialog?:MatDialog, callBackSearch?:Function):SearchDialog {
        if(!this.searchDialog) this.searchDialog = new SearchDialog(dialog, callBackSearch);
        return this.searchDialog
    }

    public openDialog():void {
        this.dialogRef = this.dialog?.open(SearchDialogComponent);
        this.dialogRef?.afterClosed().subscribe(result => {});
    }

    public closeDialog():void {
        this.dialogRef?.close();
    }

    public runCallBackFunction() {
        this.callBackSearch?this.callBackSearch():null;
    }
}
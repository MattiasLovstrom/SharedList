import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class StatusService {
    public infoMessage: string = "";
    public errorMessage: string = ""
    private messageOnTheWay: boolean = false;
    info(message: string) {
        console.log("Message: " + message);
        this.messageOnTheWay = true;
        setTimeout(() => {
            if (this.messageOnTheWay){
                this.infoMessage = message;
            }
        }, 1000);
    }

    error(message: string) {
        console.log("Error: " + message);
        this.errorMessage = message;
    }

    clear() {
        console.log("clear");
        this.messageOnTheWay = false;
        this.infoMessage = "";
        this.errorMessage = "";
    }
}
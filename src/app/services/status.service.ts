import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class StatusService {
    public infoMessage: string = "";
    public errorMessage: string = ""

    info(message: string) {
        console.log("Message: " + message);
        this.infoMessage = message;
    }

    error(message: string) {
        console.log("Error: " + message);
        this.errorMessage = message;
    }

    clear() {
        console.log("clear");
        this.infoMessage = "";
        this.errorMessage = "";
    }
}
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class StatusService {
    private _message: string = "";

    get(): string {
        return this._message;
    }

    info(message: string) {
        console.log("Message: " + message);
        this._message = message;
    }

    error(message: string) {
        console.log("Error: " + message);
        this._message = message;
    }

    clear() {
        console.log("clear");
    }
}
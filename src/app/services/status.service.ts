import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class StatusService {
    private _message: string = "";

    get(): string {
        return this._message;
    }

    set(message: string) {
        this._message = message;
    }
}
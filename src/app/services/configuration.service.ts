import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class ConfigurationService{
    Read() : Config {
        return new Config;
    }
}

export class Config {
    ListApiUrl= "https://localhost:44388/api/0_1/";
}

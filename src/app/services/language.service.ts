import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: "root"
})
export class LanguageService {
    private  BaseUrl;

    constructor(
        private httpClient: HttpClient) {
            this.BaseUrl = environment.listApiUrl + "Languages";
        }

    read():any {
        return this.httpClient.get<Language>(this.BaseUrl);  
    } 
}

export class Language {
    key: string;
    name: string;
}
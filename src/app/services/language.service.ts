import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class LanguageService {
    private readonly BaseUrl = "https://localhost:44388/";

    constructor(private httpClient: HttpClient) {}

    read():any {
        return this.httpClient.get<Language>(this.BaseUrl + "/api/0_1/Languages");  
    } 
}

export class Language {
    key: string;
    name: string;
}
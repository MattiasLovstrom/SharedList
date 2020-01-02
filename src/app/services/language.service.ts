import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LanguageService {
    read(): Language[] {
        return [ 
            {key:"sv", name: "Svenska"},
            {key:"en", name: "Enlish"}
        ];
    } 
}

export class Language {
    key: string;
    name: string;
}
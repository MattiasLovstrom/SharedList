import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class ListCollectionService {
    private readonly BaseUrl = "https://localhost:44388/api/0_1/ListCollections";

    
    collections: Collection[] = [];
    lastCollectionId: number = 0;
    
    constructor(private httpClient: HttpClient) {}

    create(name: string) {
    
        var collection = new Collection();
        collection.name = name;
    
        return this.httpClient.post<Collection>(this.BaseUrl, collection);
    }

    read(id :string = undefined): any {
        let params = "";
        if (id){
            params = "?id=" + id;
        }
        return this.httpClient.get<Collection>(this.BaseUrl + params);
    }

    update(collection: Collection) {
    }

    delete(id: string) {
        return this.httpClient.delete(this.BaseUrl + "?id=" + id);
    }
}

export class Collection{
    id: string;
    name: string;
}
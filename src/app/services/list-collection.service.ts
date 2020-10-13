import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Row, Column } from './list.service';

@Injectable({
    providedIn: "root"
})
export class ListCollectionService {
    NewRow(type: string) : Row  {
            var row = new Row();
            if (type === 'traning') {
                row.columns.push(new Column(null, 0, "false", "boolean"));
                row.columns.push(new Column(null, 1, "", "text"));
                row.columns.push(new Column(null, 2, "0", "number"));
                row.columns.push(new Column(null, 3, "0", "number")); 
            } else {
                row.columns.push(new Column(null, 0, "false", "boolean"));
                row.columns.push(new Column(null, 1, "", "text"));
            }
        
            return row;
    }

    private readonly BaseUrl;

    
    collections: Collection[] = [];
    lastCollectionId: number = 0;
    
    constructor(
        private httpClient: HttpClient) {
            this.BaseUrl = environment.listApiUrl + "ListCollections";
        }

    create(name: string, type: string) {
    
        var collection = new Collection();
        collection.name = name;
        collection.type = type;
    
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
    type: any;
}
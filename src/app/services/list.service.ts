import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: "root"
})
export class ListService{
    private BaseUrl;

    lists: List[] = [];
    lastListId: number = 0;

    constructor(
        private httpClient: HttpClient) {
            this.BaseUrl = environment.listApiUrl +  "Lists";
        }

    create(list: List): any  {
        return this.httpClient.post<List>(this.BaseUrl, list);
    }

    read(listCollectionId:string, id :string = undefined): any {
        let params = "?listCollectionId=" + listCollectionId;
        if (id){
            params = params + "&id=" + id;
        }
        return this.httpClient.get<List>(this.BaseUrl + params);
    }

    update(list: List) {
        return this.httpClient.put<List>(this.BaseUrl, list);
    }

    delete(id: string) {
        return this.httpClient.delete<List>(this.BaseUrl + "?id=" + id);
    }
}

export class List{
    id: string;
    created: Date;
    name: string;
    category: string;
    rows: string[] = [];
    languageId: string;
    listCollectionId: string;
}
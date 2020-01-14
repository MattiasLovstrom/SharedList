import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: "root"
})
export class ListService{
    private readonly BaseUrl = "https://localhost:44388/api/0_1/Lists";

    lists: List[] = [];
    lastListId: number = 0;

    constructor(private httpClient: HttpClient) {}

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
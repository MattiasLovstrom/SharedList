import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { StatusService } from './status.service';

@Injectable({
    providedIn: "root"
})
export class ListService{
    private BaseUrl;

    lists: List[] = [];
    lastListId: number = 0;

    constructor(
        private httpClient: HttpClient, 
        private status: StatusService) {
            console.log(this.status);
            this.BaseUrl = environment.listApiUrl +  "Lists";
        }

    create(list: List): any  {
        this.status.info("Cute little kittens trying to build you new list…");
        return this.httpClient.post<List>(this.BaseUrl, list)
            .pipe(
                map(x=>{
                    this.status.clear();
                    return x;
                }),
                retry(1), 
                catchError((error: HttpErrorResponse) => {
                    this.status.error("None of the cute little kittens was able to create your new list…");
                    return throwError(error);
                })
        );
    }

    read(listCollectionId:string, id :string = undefined, skip: number = 0, take: number = 10): Observable<List> {
        this.status.info("A cute kitten stands in line to get your lists…");
        let params = "?listCollectionId=" + listCollectionId;
        params = params + "&skip=" + skip;
        params = params + "&take=" + take;
        
        if (id){
            params = params + "&id=" + id;
        }
        return this.httpClient.get<List>(this.BaseUrl + params)
            .pipe(
                map(x=>{
                    this.status.clear();
                    return x; // Object.assign(new List(), x);
                }),
                retry(1), 
                catchError((error: HttpErrorResponse) => {
                    this.status.error("The cute little kitten, did something else then get you lists…");
                    return throwError(error);
                })
            );
    }

    update(list: List) {
        this.status.info("A cute little kitten was sent to update your list…");
        return this.httpClient.put<List>(this.BaseUrl, list)
            .pipe(
                map(x=>{
                    this.status.clear();
                    return x;
                }),
                retry(1), 
                catchError((error: HttpErrorResponse) => {
                    this.status.info("The cute little kitten doesn’t want to update your list right now…");
                    return throwError(error);
                })
            );
    }

    delete(id: string) {
        this.status.info("A lot of cute little kittens are dragging away your list…");
        return this.httpClient.delete<List>(this.BaseUrl + "?id=" + id)
        .pipe(
            map(x=>{
                this.status.clear();
                return x;
            }),
            retry(1), 
            catchError((error: HttpErrorResponse) => {
                this.status.error("None of the cute little kittens where able to remove anything of your list… ");
                return throwError(error);
            })
        );
    }
}

export class List{
    id: string;
    created: Date;
    name: string;
    category: string;
    rows: Row[] = [];
    languageId: string;
    listCollectionId: string;

    update(row: Row) {
        this.rows.forEach(r=>{
            if (r.id === row.id) {
                r.columns = row.columns;
            }
        })
        console.log("updating", this);
    }
}

export class Row{
    constructor(text: string){
        this.id = newGuid();

        this.columns = [ 
            new Column("checked", 0, "false", "boolean"),
            new Column("text", 1, text, "text")
        ];
    }
    id: string;
    
    columns: Column[] = [];
}

export class Column{
    constructor(id:string, index: number, content:string, type:string){
        this.id = newGuid();
        this.index = index;
        this.content = content;
        this.type = type;
    }

    id: string;
    index: number;
    content: any;
    type: string;
    
 
}

function newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
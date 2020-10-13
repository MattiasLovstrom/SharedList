import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StatusService } from './status.service';
import { catchError, map, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class ListTypeService {
    private readonly BaseUrl;

    constructor(
        private httpClient: HttpClient, 
        private status: StatusService) {
            console.log(this.status);
            this.BaseUrl = environment.listApiUrl +  "ListTypes";
        }

        read(id :string = undefined, skip: number = 0, take: number = 10): any {
            this.status.info("A gang of kittens are lokking for any types of lists…");
            let params = "";
            params = params + "?skip=" + skip;
            params = params + "&take=" + take;
            
            if (id){
                params = params + "&id=" + id;
            }
            return this.httpClient.get<ListType>(this.BaseUrl + params)
                .pipe(
                    map(x=>{
                        this.status.clear();
                        return x; // Object.assign(new List(), x);
                    }),
                    retry(1), 
                    catchError((error: HttpErrorResponse) => {
                        this.status.error("The cute little kitten, did something else then get you list types…");
                        return throwError(error);
                    })
                );
        }
    } 



export class ListType {
    id:string;
    name: string;
    columns: [
    ]
}

export class Column<T> {
    value: T;
    id: string;
    text: string;
    order: number;
    type: string;
  
    constructor(options: {
        value?: T,
        id?: string,
        text?: string,
        required?: boolean,
        order?: number,
        type?: string
      } = {}) {
      this.value = options.value;
      this.id = options.id || '';
      this.text = options.text || '';
      this.order = options.order === undefined ? 1 : options.order;
      this.type = options.type || '';
    }
}

export class StringColumn extends Column<string> {
    controlType = 'textbox';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
      }
}
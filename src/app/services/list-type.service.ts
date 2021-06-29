import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StatusService } from './status.service';
import { catchError, map, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Row, Column } from './list.service';

@Injectable({
    providedIn: "root"
})
export class ListTypeService {
    private readonly BaseUrl;

    constructor(
        private httpClient: HttpClient,
        private status: StatusService) {
        console.log(this.status);
        this.BaseUrl = environment.listApiUrl + "ListTypes";
    }

    read(id: string = undefined, skip: number = 0, take: number = 10): Observable<ListType[]> {
        this.status.info("A gang of kittens are lokking for any types of lists…");
        let params = "";
        params = params + "?skip=" + skip;
        params = params + "&take=" + take;

        if (id) {
            params = params + "&id=" + id;
        }
        return this.httpClient.get<ListType[]>(this.BaseUrl + params)
            .pipe(
                map(x => {
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

    GetRowSpec(type:string): RowSpec{
        var rowSpec = new RowSpec(type);
        if (type === 'traning') {
            rowSpec.columns.push(new ColumnSpec(0, "Done","boolean"));
            rowSpec.columns.push(new ColumnSpec(1, "Text", "text"));
            rowSpec.columns.push(new ColumnSpec(2, "Kg", "number", 80, [{start:0, stop:50, step:1}, {start:55, stop:100, step:5}, {start:110, stop:200, step:10}]));
            rowSpec.columns.push(new ColumnSpec(3, "Reps", "number", 8,  [{start:0, stop:20, step:1}]));
            rowSpec.columns.push(new ColumnSpec(4, "Sets", "number", 5, [{start:0, stop:10, step:1}]));
        } else if (type === 'calories') {
            rowSpec.columns.push(new ColumnSpec(0, "Text", "text"));
            rowSpec.columns.push(new ColumnSpec(1, "Cals", "number", 150, [{start:0, stop:1000, step:50}], "sum"));
            rowSpec.columns.push(new ColumnSpec(2, "Proteine", "number", 10,  [{start:0, stop:100, step:1}], "sum"));
        } else {
            rowSpec.columns.push(new ColumnSpec(0, "Done", "boolean"));
            rowSpec.columns.push(new ColumnSpec(1, "Text", "text"));
        }

        return rowSpec;
    }
}

export class RowSpec{
    constructor(private type:string) {
    }

    public columns: ColumnSpec[] = []; 

    NewRow(): Row {
        var row = new Row();
        this.columns.forEach(columnSpec=>{
            row.columns.push(new Column(null, columnSpec.index, columnSpec.defaultValue, columnSpec.type));
        })
        
        return row;
    }
}

export class ColumnSpec {
    defaultValue: any;
    constructor(index: number, name: string, type: string, defaultValue?: any, intervals?: Interval[], headerAction?: string){
        this.index = index;
        this.name = name;
        this.type = type;
        this.defaultValue = defaultValue;
        this.intervals = intervals;
        this.headerAction = headerAction;
    }

    public intervalsAsStrings(): string[] {
        var values = [];
        if (!this.intervals) return values;

        this.intervals.forEach(interval=>{
            for(var i = interval.start; i <= interval.stop; i+=interval.step)
            {
                values.push(i.toString());
            }
        })

        return values;
    }

    public index: number;
    public name: string;
    public type: string;
    public intervals?: Interval[] = [];
    public headerAction?: string;
}

export class ListType {
    id: string;
    name: string;
    columns: ColumnSpec[] = [];
}

export class Interval{
    start: number;
    stop:number;
    step:number;
}

import { Component, Input, OnInit } from '@angular/core';
import { ColumnSpec, ListTypeService } from '../services/list-type.service';
import { Column, List } from '../services/list.service';

@Component({
    selector: 'header-row',
    template: `
        <div class="column-empty"></div>
        <ng-container *ngFor="let column of columnValues">
            <label>{{column}}</label> 
        </ng-container>
        <div class="column-empty"></div>
        `
})
export class HeaderRowComponent implements OnInit {
    @Input() list: List;
    @Input() type: string;

    columnValues: string[] = [];

    constructor(private listTypeService: ListTypeService) {
    }
    ngOnInit(): void {
        var rowSpec = this.listTypeService.GetRowSpec(this.type);
        rowSpec.columns.forEach(columnSpec => {
            this.columnValues.push(columnSpec.name);
        });

        this.list.rows.forEach(row => {
            row.columns.forEach(column => {
                let c = column as Column;
                console.log(c);
                if (rowSpec.columns[c.index].headerAction == 'sum') {
                    if (c.type == 'number') {
                        let oldValue = parseInt(this.columnValues[c.index]);
                        let addValue = parseInt(c.content);
                        console.log(oldValue, addValue);
                        this.columnValues[c.index] = ((isNaN(oldValue) ? 0 : oldValue) + addValue).toString();
                    }
                }
            })
        });
    }
}
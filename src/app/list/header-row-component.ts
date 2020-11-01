import { Component, Input, OnInit } from '@angular/core';
import { ColumnSpec, ListTypeService } from '../services/list-type.service';
import { List } from '../services/list.service';

@Component({
    selector: 'header-row',
    template: `
    <div class="header-row">
        <div *ngFor="let column of columns">
            <label [class]="column.type">{{column.name}}</label> 
        </div>
    </div>
    `
})
export class HeaderRowComponent implements OnInit {
    @Input() list: List;
    @Input() type: string;

    columns: ColumnSpec[] = [];

    constructor(private listTypeService: ListTypeService) {
    }
    ngOnInit(): void {
        var rowSpec = this.listTypeService.GetRowSpec(this.type);
        this.columns = rowSpec.columns;
    }
}
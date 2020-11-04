import { Component, Input, OnInit } from '@angular/core';
import { ColumnSpec, ListTypeService } from '../services/list-type.service';
import { List } from '../services/list.service';

@Component({
    selector: 'header-row',
    template: `
        <div class="column-empty"></div>
        <ng-container *ngFor="let column of columns">
            <label [class]="'column-'+column.type">{{column.name}}</label> 
        </ng-container>
        <div class="column-empty"></div>
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
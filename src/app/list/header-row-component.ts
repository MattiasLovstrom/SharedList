import { Component, Input, OnInit } from '@angular/core';
import { ListTypeService } from '../services/list-type.service';
import { List } from '../services/list.service';

@Component({
    selector: 'header-row',
    template: `
    <div class="header-row">
        <div *ngFor="let column of columns">
            <label>{{column}}</label> 
        </div>
    </div>
    `
})
export class HeaderRowComponent implements OnInit {
    @Input() list: List;
    @Input() type: string;

    columns: string[] = [];

    constructor(private listTypeService: ListTypeService) {
    }
    ngOnInit(): void {
        var rowSpec = this.listTypeService.GetRowSpec(this.type);
        rowSpec.columns.forEach(columnSpec=>{
            this.columns.push(columnSpec.name);
        })
    }
}
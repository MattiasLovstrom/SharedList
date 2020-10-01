import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Row } from '../services/list.service';

@Component({
    selector: 'row',
    template: `
        <ng-container *ngFor="let column of row.columns">
            <input *ngIf="column.type=='boolean'" type="checkbox" id="i" name="ossm" [checked]="row.columns[0].content == 'true'" (click)="toggleRow()"> 
            <label *ngIf="column.type=='text'">{{row.columns[1].content}}</label>
        </ng-container>
    `
})
export class RowComponent {
    @Input() row: Row;

    @Output() changed = new EventEmitter<Row>();

    toggleRow() {
        this.row.columns[0].content = !(this.row.columns[0].content == 'true');
        this.changed.emit(this.row);
    }
}
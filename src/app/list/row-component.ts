import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Row } from '../services/list.service';
import { Command, EditCommand } from './lists.component';

@Component({
    selector: 'row',
    template: `
        <ng-container *ngFor="let column of row.columns">
            <input *ngIf="column.type=='boolean'" type="checkbox" id="i" name="ossm" [checked]="column.content == 'true'" (click)="toggleRow()" [class]="column.type"> 
            <label *ngIf="column.type=='text'" [class]="column.type">{{column.content}}</label>
            <label *ngIf="column.type=='number'" [class]="column.type">{{column.content}}</label>
        </ng-container>
    `
})
export class RowComponent {
    @Input() row: Row;

    @Output() changed = new EventEmitter<EditCommand>();

    toggleRow() {
        this.row.columns[0].content = !(this.row.columns[0].content == 'true');
        this.changed.emit(new EditCommand(Command.Update, this.row));
    }
}
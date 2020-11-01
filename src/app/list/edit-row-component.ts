import { Component, Input, Output, EventEmitter, OnInit, ViewChildren, ElementRef, AfterContentChecked, AfterViewChecked, AfterViewInit, ViewChild } from '@angular/core';
import { Column, Row} from '../services/list.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EditCommand, Command } from './lists.component';
import { ListTypeService } from '../services/list-type.service';

@Component({
    selector: 'edit-row',
    template: `
    <form   [formGroup]="rowForm" (ngSubmit)="save()">
        <input #focusInput formControlName="{{firstColumnSpec.nameInForm}}" placeholder="{{firstColumnSpec.placeholder}}">
        <ng-container *ngFor="let column of columnSpec">
            <input *ngIf="column.column.type=='text'" formControlName="{{column.nameInForm}}" placeholder="{{column.placeholder}}" >
            <select *ngIf="column.column.type=='number'" formControlName="{{column.nameInForm}}" [value]="column.defaultValue">
                <option *ngFor="let val of column.values">
                    {{val}}
                </option>
            </select>
        </ng-container>
        <button type="submit">Save</button>
    </form>
    `   
})
export class EditRowComponent implements OnInit, AfterViewInit  {
    @Input() row: Row;
    @Input() type: string;
    @Output() changed = new EventEmitter<EditCommand>();

    @ViewChild('focusInput', null) focusInput: ElementRef;
    
    rowForm: FormGroup;
    firstColumnSpec: ColumnSpec;
    columnSpec: ColumnSpec[] = [];

    constructor(
        private formBuiler: FormBuilder,
        private listTypeService: ListTypeService)
    {}
    

    ngAfterViewInit(): void {
        this.focusInput.nativeElement.focus();        
    }

    ngOnInit(): void {
        var rowSpec = this.listTypeService.GetRowSpec(this.type);

        rowSpec.columns.forEach((columnSpec)=> {
            if (columnSpec.type != 'boolean'){
                this.columnSpec.push(
                    {
                        placeholder: columnSpec.name,
                        index: columnSpec.index,
                        column: this.row.columns[columnSpec.index],
                        nameInForm: "column" + columnSpec.index,
                        defaultValue: columnSpec.defaultValue,
                        class:"edit-row__" + columnSpec.type,
                        values: columnSpec.intervalsAsStrings()
                    })
            }
        });
        
        var formControlNames: {[k: string]: any} = {};
        this.columnSpec.forEach((column)=>{
            formControlNames[column.nameInForm] = column.defaultValue;
        });
        
        this.firstColumnSpec = this.columnSpec[0];
        this.columnSpec = this.columnSpec.splice(1, this.columnSpec.length - 1);

        this.rowForm = this.formBuiler.group(formControlNames);

        console.log(this.columnSpec);
    }
    
    save() {
        this.firstColumnSpec.column.content = this.rowForm.get(this.firstColumnSpec.nameInForm).value;
        this.columnSpec.forEach(column => {
            column.column.content = this.rowForm.get(column.nameInForm).value; 
        });
        this.changed.emit(new EditCommand(Command.Update, this.row));
        this.changed.emit(new EditCommand(Command.Create, null));
    }
}

class ColumnSpec {
    placeholder: string;
    index: number;
    column: Column;
    nameInForm: string;
    defaultValue: any;
    class:string;
    values: string[];
    
    constructor(column: Column) {
        this.column = column;
        this.placeholder = column.type
        this.index = column.index;
        this.nameInForm = "column" + column.index;
        this.class = "edit-row__" + column.type;
        this.values = ["100", "200", "3"];
    }
}

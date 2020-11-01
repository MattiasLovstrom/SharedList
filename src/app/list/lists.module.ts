import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListsComponent } from './lists.component';
import { RouterModule } from '@angular/router';
import { ShowAsDate } from '../show-as-date.pipe';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { HeaderRowComponent } from './header-row-component';
import { RowComponent } from './row-component';
import { EditRowComponent } from './edit-row-component';

@NgModule({
    declarations: [
        ListsComponent,
        ShowAsDate,
        HeaderRowComponent,
        RowComponent,
        EditRowComponent
    ], 
    imports: [
        BrowserModule, 
        FormsModule,
        RouterModule,
        DragDropModule,
        ReactiveFormsModule
    ]
})
export class ListsModule {}
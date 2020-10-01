import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ListsComponent } from './lists.component';
import { RouterModule } from '@angular/router';
import { ShowAsDate } from '../show-as-date.pipe';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { RowComponent } from './row-component';

@NgModule({
    declarations: [
        ListsComponent,
        ShowAsDate,
        RowComponent
    ], 
    imports: [
        BrowserModule, 
        FormsModule,
        RouterModule,
        DragDropModule
    ]
})
export class ListsModule {}
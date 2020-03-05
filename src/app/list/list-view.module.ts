import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListViewComponent } from './list-view.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule ({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DragDropModule
    ],
    declarations: [
        ListViewComponent
    ]
})
export class ListViewModule {}
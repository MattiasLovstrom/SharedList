import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListEditComponent } from './list-edit.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule ({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DragDropModule
    ],
    declarations: [
        ListEditComponent
    ]
})
export class ListEditModule {}
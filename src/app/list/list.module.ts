import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule ({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DragDropModule
    ],
    declarations: [
        ListComponent
    ]
})
export class ListModule {}
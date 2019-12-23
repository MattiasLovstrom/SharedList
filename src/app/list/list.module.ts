import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list.component';

@NgModule ({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        ListComponent
    ]
})
export class ListModule {}
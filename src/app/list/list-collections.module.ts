import { NgModule } from '@angular/core';
import { ListCollectionsComponent } from './list-collections.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        ListCollectionsComponent
    ],
    imports: [
        CommonModule,
        BrowserModule, 
        FormsModule,
        RouterModule
    ],
    exports: [
        ListCollectionsComponent
    ]
})
export class ListCollectionsModule {
}
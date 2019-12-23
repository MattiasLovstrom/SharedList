import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ListsComponent } from './lists.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ListsComponent
    ], 
    imports: [
        BrowserModule, 
        FormsModule,
        RouterModule
    ]
})
export class ListsModule {

}
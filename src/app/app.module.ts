import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListsModule } from './list/lists.module';
import { ListsComponent } from './list/lists.component';
import { RouterModule, Routes } from '@angular/router';
import { ListEditComponent } from './list/list-edit.component';
import { ListEditModule } from './list/list-edit.module';
import { ListViewComponent } from './list/list-view.component';
import { ListViewModule } from './list/list-view.module';
import { ListCollectionsModule } from './list/list-collections.module';
import { ListCollectionsComponent } from './list/list-collections.component';

import { HttpClientModule } from '@angular/common/http'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: '', component: ListCollectionsComponent },
  { path: ':listcollection', component: ListsComponent },
  { path: ':listcollection/:id', component: ListViewComponent },
  { path: ':listcollection/:id/edit', component: ListEditComponent }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ListsModule,
    ListEditModule,
    ListViewModule,
    RouterModule.forRoot(routes),
    ListCollectionsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

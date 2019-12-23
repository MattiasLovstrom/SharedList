import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListsModule } from './list/lists.module';
import { ListsComponent } from './list/lists.component';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ListModule } from './list/list.module';
import { ListCollectionsModule } from './list/list-collections.module';
import { ListCollectionsComponent } from './list/list-collections.component';

const routes: Routes = [
  { path: '', component: ListCollectionsComponent },
  { path: ':listcollection', component: ListsComponent },
  { path: ':listcollection/:id', component: ListComponent }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ListsModule,
    ListModule,
    RouterModule.forRoot(routes),
    ListCollectionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

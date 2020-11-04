import { Component, OnInit } from '@angular/core';
import { ListCollectionService, Collection } from '../services/list-collection.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ListType, ListTypeService } from '../services/list-type.service';

@Component({
    selector: 'list-collections',
    template: `
<div class="row">
    <div class="col-md-6">
    <h1>List collections</h1>       
    <div class="list-header">
        <form #listCollectionForm="ngForm" novalidate (ngSubmit)="create(listCollectionForm.value)">
            <input type="text" name="name" placeholder="Name of new list collection" ngModel />
            <select id="selectType" name="listtype" ngModel>
                <option *ngFor="let x of types" [ngValue]="x.id">{{x.name}}</option>
            </select>
            <button  title="Create new list collection" class="btn fa fa-plus"></button>
        </form>
    </div>
        <ol class="list-collections">
            <li *ngFor="let collection of collections">
               <a routerLink="/{{collection.id}}" routerLinkActive="active">{{collection.name}}</a>&nbsp;&nbsp;&nbsp;
               <button title="Remove" class="btn fa fa-times"  (click)="delete(collection.id)"></button>
            </li>
         </ol>
    </div>
</div>
    `
})
export class ListCollectionsComponent implements OnInit {

    collections: Collection[] = [];
    types: ListType[] = [];

    constructor(
        private listCollectionService: ListCollectionService,
        private listTypesService: ListTypeService,
        private router: Router) {
    }

    ngOnInit(): void {
        let s = this.listTypesService.read().subscribe(result => {
            this.types = result;
            s.unsubscribe();
        });
        this.reload();
    }

    reload() {
        let s = this.listCollectionService.read().subscribe(result => {
            this.collections = result;
            s.unsubscribe();
        });
    }

    create(form: any) {
        let s = this.listCollectionService.create(form.name, form.listtype).subscribe(result => {
            console.log("Creating collection: ", result);
            this.router.navigate([`/${result.id}`]);
            s.unsubscribe();
        });
    }

    delete(id) {
        if (confirm("Are you sure to delete this list collection")) {
            let s = this.listCollectionService.delete(id).subscribe(result => {
                this.reload();
            });
        }
    }
} 
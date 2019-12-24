import { Component, OnInit } from '@angular/core';
import { ListCollectionService, Collection } from '../services/list-collection.service';
import { Router } from '@angular/router';

@Component({
    selector : 'list-collections',
    template: `
        <h2>List collections</h2>
        <form #listCollectionForm="ngForm" novalidate (ngSubmit)="create(listCollectionForm.value)">
            <input type="text" name="name" placeholder="Name of new list collection" ngModel />
            <button>Create list collection</button>
        </form>
        <ul>
    <li *ngFor="let collection of collections">
        <a routerLink="/{{collection.name}}" routerLinkActive="active">{{collection.id}} {{collection.name}}</a>
        <button (click)="delete(collection.id)">Remove</button>
    </li>
</ul>
    `
})
export class ListCollectionsComponent implements OnInit {
    collections: Collection[] = [];
    
    constructor(
        private listCollectionService: ListCollectionService, 
        private router: Router) {
    }

    ngOnInit(): void {
        this.collections = this.listCollectionService.list();
    }

    create(form: any) {
        const listCollection = this.listCollectionService.create();
        listCollection.name = form.name;
        this.collections = this.listCollectionService.list();
        this.router.navigate([`/${listCollection.id}`]);
    }

    delete(id) {
        this.listCollectionService.delete(id);
    }
} 
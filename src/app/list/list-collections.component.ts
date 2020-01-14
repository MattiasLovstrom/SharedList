import { Component, OnInit } from '@angular/core';
import { ListCollectionService, Collection } from '../services/list-collection.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
        <a routerLink="/{{collection.id}}" routerLinkActive="active">{{collection.id}} {{collection.name}}</a>
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
        this.reload();
    }

    reload() {
        let s = this.listCollectionService.read().subscribe(result =>{
            this.collections = result;
            s.unsubscribe();
        });
    }

    create(form: any) {
        let s= this.listCollectionService.create(form.name).subscribe(result=>
            {
                console.log("Creating collection: ", result);
                this.router.navigate([`/${result.id}`]);
                s.unsubscribe();
            });  
    }

    delete(id) {
        let s = this.listCollectionService.delete(id).subscribe(result=>{
            this.reload();
        });
    }
} 
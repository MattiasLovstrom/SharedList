import { Component, OnInit } from '@angular/core';
import { ListService, List } from '../services/list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LanguageService, Language } from '../services/language.service';

@Component({
    selector: 'sharedlist-list',
    templateUrl: "./lists.component.html"
})
export class ListsComponent implements OnInit {
    collectionId: string;
    lists: List[];
    languages: Language[];
    languageId: string;
    listName: string = null;
    subject: Subject<any> = new Subject<any>();
    
    constructor(
        private listService: ListService,
        private languageService: LanguageService, 
        private router: Router,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap
        .pipe(
            map(x => x.get("listcollection")),
            takeUntil(this.subject.asObservable())
        )
        .subscribe(async id => {
            this.collectionId = id;
            var list = this.listService.read(id);
            console.log(list);
            let s = this.listService.read(id).subscribe(result => {
                this.lists = result;
                s.unsubscribe();
            });
            
        });


        
        let subscription = this.languageService.read().subscribe(result => {
            this.languages = result;
            subscription.unsubscribe();
        });

        this.languageId = navigator.language;
    }

    createList(nameElement: any) {
        let list = new List();
        list.name = nameElement.name;
        list.languageId = this.languageId;
        list.listCollectionId = this.collectionId;
        
        let s = this.listService.create(list).subscribe(result => {
            console.log("Create list: ", result);
            this.router.navigate([`/${result.listCollectionId}/${result.id}`]);
            s.unsubscribe();
        });
    }

    edit(id: string) {
        this.router.navigate([`/${this.collectionId}/${id}`]);
    }

    copy(list: List) {
        let s = this.listService.create(list).subscribe(result =>{
            const newList = result; 
            this.router.navigate([`/${this.collectionId}/${newList.id}`]);
            s.unsubscribe();
        });
    }
}
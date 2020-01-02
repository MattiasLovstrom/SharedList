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
        });

        this.lists = this.listService.list();
        this.languages = this.languageService.read();
        this.languageId = navigator.language;
    }

    createList(nameElement: any) {
        const list = this.listService.create();
        list.name = nameElement.name;
        list.language = this.languageId;
        this.listService.update(list);
        this.router.navigate([`/${this.collectionId}/${list.id}`]);
    }

    edit(id: string) {
        this.router.navigate([`/${this.collectionId}/${id}`]);
    }

    copy(list: List) {
        const newList = this.listService.create(list);
        newList.name = list.name;
        this.router.navigate([`/${this.collectionId}/${newList.id}`]);
    }
}
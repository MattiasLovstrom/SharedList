import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ListService, List } from '../services/list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, takeUntil} from 'rxjs/operators';
import { Subject} from 'rxjs';
import { LanguageService, Language } from '../services/language.service';
import { ListCollectionService, Collection } from '../services/list-collection.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'sharedlist-list',
    templateUrl: "./lists.component.html"
})
export class ListsComponent implements OnInit {
    collectionId: string;
    collection: Collection;
    languages: Language[];
    languageId: string;
    listName: string = null;
    subject: Subject<any> = new Subject<any>();
    countlists = new Pager(1,10);
    lists:List[] = [];
    currentList: List;
    editRow:string = "";
    editing:boolean = false;
    
    constructor(
        private listService: ListService,
        private languageService: LanguageService,
        private listCollectionService: ListCollectionService, 
        private router: Router,
        private route: ActivatedRoute, 
        private titleService: Title) {}

    ngOnInit(): void {
        this.route.paramMap
        .pipe(
            map(x => x.get("listcollection")),
            takeUntil(this.subject.asObservable())
        )
        .subscribe(async id => {
            this.collectionId = id;
            let s = this.listService.read(id).subscribe(result => {
                this.currentList = result[0];
                s.unsubscribe();
            });
            let s1 = this.listCollectionService.read(id).subscribe(result => {
                this.collection = result[0];
                s1.unsubscribe(); 
                this.titleService.setTitle(this.collection.name + " - Shared list");
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

    addRowOnClick(addRowButton: HTMLButtonElement, focusOnElement:HTMLTextAreaElement){
        this.editing = !this.editing;
        focusOnElement.hidden = !this.editing;
        focusOnElement.focus();
    }

    addRow(el:HTMLTextAreaElement) {
        let s = this.listService.read(this.collectionId, this.currentList.id).subscribe(result => {
            this.currentList = result[0];
            this.currentList.rows.push(el.value);
            el.value = ""
            let s1 = this.listService.update(this.currentList).subscribe(result=>{
                s1.unsubscribe();
              });
            s.unsubscribe();
        });
      }

    addRowValue(value: string) {
        this.editing = false;
        let s = this.listService.read(this.collectionId, this.currentList.id).subscribe(result => {
            this.currentList = result[0];
            this.currentList.rows.push(value);
            let s1 = this.listService.update(this.currentList).subscribe(result=>{
                s1.unsubscribe();
              });
            s.unsubscribe();
        });
      }

    removeRow(i: number) {
        let s = this.listService.read(this.collectionId, this.currentList.id).subscribe(result => {
            if (result[0].rows.length >= i && this.currentList.rows [i] === result[0].rows[i]) {
                result[0].rows.splice(i, 1);
            
                let s1 = this.listService.update(result[0]).subscribe(result=>{
                    this.currentList = result;
                    s1.unsubscribe();
                  });
            }
            
            s.unsubscribe();
        });
    }
      
    edit(id: string) {
        this.router.navigate([`/${this.collectionId}/${id}`]);
    }

    copy(list: List) {
        list.created = undefined;
        let s = this.listService.create(list).subscribe(result =>{
            const newList = result; 
            this.router.navigate([`/${this.collectionId}/${newList.id}`]);
            s.unsubscribe();
        });
    }

    readMore() {
        let subscriber = this.listService.read(this.collectionId, null, this.countlists.skip, this.countlists.take).subscribe(l=>{
            var numberOfListsBefore = this.lists.length;
            this.lists = this.lists.concat(l);
            console.log(this.lists);
            this.countlists.skip = this.countlists.skip + this.countlists.take;
            this.countlists.hasMore = this.lists.length >= numberOfListsBefore + this.countlists.take;
            subscriber.unsubscribe();
        });
    }
}

export class Pager{
    skip: number;
    take: number;
    hasMore: boolean;

    constructor(skip: number, take: number){
        this.skip = skip;
        this.take = take;
        this.hasMore = true;
    }
}
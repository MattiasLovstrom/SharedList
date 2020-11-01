import { Component, OnInit } from '@angular/core';
import { ListService, List, Row } from '../services/list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, takeUntil} from 'rxjs/operators';
import { Subject} from 'rxjs';
import { LanguageService, Language } from '../services/language.service';
import { ListCollectionService, Collection } from '../services/list-collection.service';
import { Title } from '@angular/platform-browser';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { StatusService } from '../services/status.service';
import { ListTypeService } from '../services/list-type.service';

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
    editingRow: number = -1;
    editStatus: EditStatus = EditStatus.Load;
    lastUpdate: number = Date.now();

    constructor(
        private listService: ListService,
        private languageService: LanguageService,
        private listCollectionService: ListCollectionService, 
        private router: Router,
        private route: ActivatedRoute, 
        private titleService: Title, 
        private listTypeService: ListTypeService,
        private status: StatusService) {}

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

            this.AddListSync(1);
            
            let s1 = this.listCollectionService.read(id).subscribe(result => {
                this.collection = result[0];
                s1.unsubscribe(); 
                this.titleService.setTitle(this.collection.name + " - Shared list");
                this.listName = this.collection.name;
            });
        });
        
        let subscription = this.languageService.read().subscribe(result => {
            this.languages = result;
            subscription.unsubscribe();
        });

        this.languageId = navigator.language;
    }

    AddListSync(reloadTime: number) {
        setTimeout(() => {
            this.listSync();
            this.AddListSync(reloadTime);
        }, reloadTime * 1000); 
    }

    listSync() {
        if (this.editStatus == EditStatus.Save)
            {
                let s1 = this.listService.update(this.currentList).subscribe(result=>{
                    this.currentList = result;
                    this.editStatus = EditStatus.Load;
                    s1.unsubscribe();
              });
            } else if (this.editStatus == EditStatus.Load)
            {
                if ((Date.now() - this.lastUpdate) > 60000)
                {
                    this.lastUpdate = Date.now();
                    let s = this.listService.read(this.collectionId).subscribe(result => {
                        this.currentList = result[0];
                        console.log('reload', this.currentList);
                        s.unsubscribe();
                    });    
                }
            }
    }

    createList() {
        let list = new List();
        list.name = this.listName;
        list.languageId = this.languageId;
        list.listCollectionId = this.collectionId;
        
        let s = this.listService.create(list).subscribe(result => {
            this.router.navigate([`/${result.listCollectionId}/${result.id}`]);
            s.unsubscribe();
        });
    }

    addRowOnClick(){
        var currentStatus = this.editStatus
        this.editStatus = EditStatus.None;
            
        var row = this.listTypeService.GetRowSpec(this.collection.type).NewRow();
        this.currentList.rows.push(row);
        this.editingRow = this.currentList.rows.length - 1;

        this.editStatus = currentStatus;
    }

    onChanged(command: EditCommand) {
        if (command.command == Command.Update){
            this.editStatus = EditStatus.Save;
        } else if (command.command == Command.Create)
        {
            this.addRowOnClick();
        }        
    }

    removeRow(i: number) {
        this.editStatus = EditStatus.None;
        this.currentList.rows.splice(i, 1);
        this.editStatus = EditStatus.Save;
    }

    copyRow(value: Row) {
        this.currentList.rows.push(value);
        this.editStatus = EditStatus.Save;
      }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.currentList.rows, event.previousIndex, event.currentIndex);
        this.editStatus = EditStatus.Save;
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

export class EditCommand {
    row:Row;
    command: Command;
    
    constructor(command: Command, row: Row) {
        this.command = command;
        this.row = row;
    }
} 

export enum Command {
    Create,
    Update, 
    Delete 
}

enum EditStatus {
    None,
    Save,
    Load
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
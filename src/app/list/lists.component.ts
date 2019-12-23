import { Component, OnInit } from '@angular/core';
import { ListService, List } from '../services/list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'sharedlist-list',
    templateUrl: "./lists.component.html"
})
export class ListsComponent implements OnInit {
    listcollectionId: string;
    lists: List[];
    listName: string = null;
    subject: Subject<any> = new Subject<any>();
    
    constructor(
        private listService: ListService, 
        private router: Router,
        private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap
        .pipe(
            map(x => x.get("listcollection")),
            takeUntil(this.subject.asObservable())
        )
        .subscribe(async id => {
            this.listcollectionId = id;
            var list = this.listService.read(id);
            console.log(list);
            // this.form.controls.name.setValue(list.name);
            // list.rows.forEach(line => {
            //   this.addRow(line);
            // });
        });

        this.lists = this.listService.list();

    }

    createList(nameElement: any) {
        const list = this.listService.create();
        list.name = nameElement.name;
        this.router.navigate([`/${this.listcollectionId}/${list.id}`]);
    }

    delete(id) {
        this.listService.delete(id);
    }
}
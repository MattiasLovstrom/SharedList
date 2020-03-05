import { Component, OnInit, } from '@angular/core';
import { ListService, List } from '../services/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './list-view.component.html'
})
export class ListViewComponent implements OnInit{
    list: List;
    subject: Subject<any> = new Subject<any>();
    collectionId: string;
    waiting: boolean;

    constructor(
      private route: ActivatedRoute, 
      private listService: ListService, 
      private router: Router, 
      private titleService: Title) 
    {
    }

    ngOnInit(): void {
      this.waiting = true;
        this.route.paramMap
            .pipe(
                map(x => [x.get("id"), x.get("listcollection")]),
                takeUntil(this.subject.asObservable())
            )
            .subscribe(async id => {
              var listid = id[0];
              var collectionId = id[1];
              this.collectionId = collectionId;
                var s = this.listService.read(collectionId, listid).subscribe(result =>{
                  this.list = result[0];
                  this.titleService.setTitle(this.list.name + " - Shared list");
                  s.unsubscribe();
                  this.waiting = false;
                }); 
            });
    }

    cancel() {
      this.router.navigate([`/${this.collectionId}`]);
    }

    edit() {
      this.router.navigate([`/${this.collectionId}/${this.list.id}/edit`]);
    }

    delete() {
      this.waiting = true;
      let s = this.listService.delete(this.list.id).subscribe(result =>{
        s.unsubscribe();
        this.router.navigate([`/${this.collectionId}`]);
      });
    }

    drop(event: CdkDragDrop<string[]>) {
      moveItemInArray(this.list.rows, event.previousIndex, event.currentIndex);
      this.save();
    }

    save() {
      this.waiting = true;
      
      let s = this.listService.update(this.list).subscribe(result=>{
        s.unsubscribe();
        this.waiting = false;
      });
    }
}

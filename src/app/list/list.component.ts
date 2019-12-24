import { Component, OnInit, } from '@angular/core';
import { ListService, List } from '../services/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit{
    form: FormGroup;
    subject: Subject<any> = new Subject<any>();
    id: string;
    collectionId: string;
    
    constructor(
      private route: ActivatedRoute, 
      private listService: ListService, 
      private formBuiler: FormBuilder, 
      private router: Router) 
    {
        this.form = this.formBuiler.group({
            name: new FormControl(), 
            category: new FormControl(), 
            rows: this.formBuiler.array([]),
          });
    }

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                map(x => [x.get("id"), x.get("listcollection")]),
                takeUntil(this.subject.asObservable())
            )
            .subscribe(async id => {
                this.id = id[0];
                this.collectionId = id[1];
                var list = this.listService.read(this.id);
                console.log(list);
                this.form.controls.name.setValue(list.name);
                list.rows.forEach(line => {
                  this.addRow(line);
                });
            });
    }

    addRow(value) {
        const creds = this.form.controls.rows as FormArray;
        creds.push(this.formBuiler.group({
          col1: value
        }));
      }
    
    save() {
      var name = this.form.getRawValue().name;
      var category = this.form.getRawValue().category;
      
      var rowsArray = this.form.getRawValue().rows;
      var rows = [];
      rowsArray.forEach(x=>rows.push(x.col1));
      
      var list = new List(this.id);
      list.name = name;
      list.category = category;
      list.rows = rows; 

      this.listService.update(list);

      this.router.navigate(["/" + this.collectionId]);
    }

    onKey(){
      console.log(1);
    }
}




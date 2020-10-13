import { Component, OnInit, } from '@angular/core';
import { ListService, List, Row, Column } from '../services/list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './list-edit.component.html'
})
export class ListEditComponent implements OnInit{
    list: List;
    form: FormGroup;
    subject: Subject<any> = new Subject<any>();
    collectionId: string;
    waiting: boolean;

    constructor(
      private route: ActivatedRoute, 
      private listService: ListService, 
      private formBuiler: FormBuilder, 
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

              this.form = this.formBuiler.group({
                name: new FormControl(), 
                category: new FormControl(),
                time: new FormControl(), 
                rows: this.formBuiler.array([]),
              });
    
              var listid = id[0];
              var collectionId = id[1];
              this.collectionId = collectionId;
                var s = this.listService.read(collectionId, listid).subscribe(result =>{
                  this.list = result[0];
                  this.form.controls.name.setValue(this.list.name);
                  this.titleService.setTitle(this.list.name + " - Shared list");
                  this.form.controls.category.setValue(this.list.category);
                  this.form.controls.time.setValue(this.list.created);
                  this.list.rows.forEach(line => {
                    this.addRow(line.columns[1].content);
                  });
                  s.unsubscribe();
                  this.waiting = false;
                }); 
            });
    }

    addRow(value:string) {
        const rows = this.form.controls.rows as FormArray;
        rows.push(this.formBuiler.group({
          col1: value
        }));
      }
    
    removeRow(index: number) {
      const rows = this.form.controls.rows as FormArray;
      rows.removeAt(index);   
    }  

    save() {
      this.waiting = true;
      var name = this.form.getRawValue().name;
      var category = this.form.getRawValue().category;
      var time = this.form.getRawValue().time;
      
      var rowsArray = this.form.getRawValue().rows;
      var rows = [];
      rowsArray.forEach((x)=>{
        var row = new Row(); 
        row.columns.push(new Column(null, 0, "false", "boolean"));
        row.columns.push(new Column(null, 1, x.col1, "text"));
        rows.push(row);
      });
      this.list.name = name;
      this.list.category = category;
      this.list.created = time;
      this.list.rows = rows; 

      this.listService.update(this.list).subscribe(result=>{
        this.router.navigate([`/${this.collectionId}/${this.list.id}`]);
      });
    }


    cancel() {
      this.router.navigate([`/${this.collectionId}/${this.list.id}`]);
    }

    getControls(frmGrp: FormGroup, key: string) {
      return (<FormArray>frmGrp.controls[key]).controls;
    }

    drop(event: CdkDragDrop<string[]>) {
      const rows = this.form.controls.rows as FormArray;
      const r = rows.value;
      moveItemInArray(r, event.previousIndex, event.currentIndex);
      rows.setValue(r);
    }
}

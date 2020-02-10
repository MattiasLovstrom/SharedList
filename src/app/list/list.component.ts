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
    list: List;
    form: FormGroup;
    subject: Subject<any> = new Subject<any>();
    collectionId: string;

    constructor(
      private route: ActivatedRoute, 
      private listService: ListService, 
      private formBuiler: FormBuilder, 
      private router: Router) 
    {
    }

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                map(x => [x.get("id"), x.get("listcollection")]),
                takeUntil(this.subject.asObservable())
            )
            .subscribe(async id => {

              this.form = this.formBuiler.group({
                name: new FormControl(), 
                category: new FormControl(), 
                rows: this.formBuiler.array([]),
              });
    
              var listid = id[0];
              var collectionId = id[1];
              this.collectionId = collectionId;
                var s = this.listService.read(collectionId, listid).subscribe(result =>{
                  this.list = result[0];
                  this.form.controls.name.setValue(this.list.name);
                  this.form.controls.category.setValue(this.list.category);
                  this.list.rows.forEach(line => {
                    this.addRow(line);
                  });
                  if (this.list.rows.length == 0)
                  {
                    for(var i = 0; i < 3; i++) this.addRow('');
                  }
                  s.unsubscribe();
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
      var name = this.form.getRawValue().name;
      var category = this.form.getRawValue().category;
      
      var rowsArray = this.form.getRawValue().rows;
      var rows = [];
      rowsArray.forEach(x=>rows.push(x.col1));
      
      this.list.name = name;
      this.list.category = category;
      this.list.rows = rows; 

      this.listService.update(this.list).subscribe(result=>{
        this.router.navigate([`/${this.collectionId}`]);
      });
    }

    delete() {
      let s = this.listService.delete(this.list.id).subscribe(result =>{
        s.unsubscribe();
        this.router.navigate([`/${this.collectionId}`]);
      });
    }


    cancel() {
      this.router.navigate([`/${this.collectionId}`]);
    }

    getControls(frmGrp: FormGroup, key: string) {
      return (<FormArray>frmGrp.controls[key]).controls;
    }
}

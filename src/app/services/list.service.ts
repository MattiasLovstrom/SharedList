import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class ListService{
    lists: List[] = [];
    lastListId: number = 0;

    create(): List  {
        var newList = new List((this.lastListId++).toString());
        this.lists.push(newList);
       
        return newList;
    }

    read(id :string): List {
        return this.lists.find(x => x.id === id);
    }

    list(): List[] {
        return this.lists;
    }

    update(list: List) {
        var existing = this.lists.find(x=>x.id === list.id);
        this.lists.splice(this.lists.indexOf(existing), 1);
        this.lists.push(list);
        this.lists.sort((a, b) => a.name.localeCompare(b.name))
    }

    delete(id: string) {
        var existing = this.lists.find(x=>x.id === id);
        this.lists.splice(this.lists.indexOf(existing), 1);
    }
}

export class List{
    constructor(id: string){
        this.id = id;
    }

    id: string;
    name: string;
    category: string;
    rows: string[] = [];
}
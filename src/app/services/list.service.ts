import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class ListService{
    lists: List[] = [];
    lastListId: number = 0;

    create(oldList: List = null): List  {
        var list: List;
        if (oldList)
        {
            list = JSON.parse(JSON.stringify(oldList));
        } else
        {
            list = new List();
        }
        list.created = new Date();
        list.id = (this.lastListId++).toString();

        this.lists.push(list);
        this.lists.sort((a, b) => a.created>b.created ? -1 : a.created<b.created ? 1 : 0)
       
        return list;
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
        this.lists.sort((a, b) => a.created>b.created ? -1 : a.created<b.created ? 1 : 0)
    }

    delete(id: string) {
        var existing = this.lists.find(x=>x.id === id);
        this.lists.splice(this.lists.indexOf(existing), 1);
    }
}

export class List{
    id: string;
    created: Date;
    name: string;
    category: string;
    rows: string[] = [];
    language: string;
}
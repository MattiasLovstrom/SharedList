import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class ListCollectionService {
    collections: Collection[] = [];
    lastCollectionId: number = 0;
    
    create(): Collection  {
        var collectionList = new Collection((this.lastCollectionId++).toString());
        this.collections.push(collectionList);
       console.log(this.collections.length);
        return collectionList;
    }

    read(id :string): Collection {
        return this.collections.find(x => x.id === id);
    }

    list(): Collection[] {
        return this.collections;
    }

    update(collection: Collection) {
        var existing = this.collections.find(x=>x.id === collection.id);
        this.collections.splice(this.collections.indexOf(existing), 1);
        this.collections.push(collection);
        this.collections.sort((a, b) => a.name.localeCompare(b.name))
    }

    delete(id: string) {
        var existing = this.collections.find(x=>x.id === id);
        this.collections.splice(this.collections.indexOf(existing), 1);
    }
}

export class Collection{
    constructor(id: string){
        this.id = id;
    }

    id: string;
    name: string;
}
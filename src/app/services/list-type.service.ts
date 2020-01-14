import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ListTypeService {
    read(): ListType[] {
        return [ 
            {name: "Svenska", columns: []}
        ];
    } 
}

export class ListType {
    name: string;
    columns: [
    ]
}

export class Column<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
  
    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
    }
}

export class StringColumn extends Column<string> {
    controlType = 'textbox';
    type: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
      }
}
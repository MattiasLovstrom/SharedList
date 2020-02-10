import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'showAsDate'})
export class ShowAsDate implements PipeTransform {
    transform(value: any): string {
        var d = new Date(value);
        return d.toLocaleDateString("SV-se") + " " + d.getHours() + ":" + d.getMinutes();;
    }
}
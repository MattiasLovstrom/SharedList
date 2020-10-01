import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'showAsDate'})
export class ShowAsDate implements PipeTransform {
    transform(value: any): string {
        try {
            var d = new Date(value);
            return d.toLocaleDateString("SV-se") + " " + d.toLocaleTimeString("sv-se", {hour: '2-digit', minute:'2-digit'});
        } catch {
            return "Not a date";
        }
}
}
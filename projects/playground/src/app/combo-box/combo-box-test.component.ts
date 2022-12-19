import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface IItem {
    id: number;
    name: string;
}

const ITEMS: Array<IItem> = [
    { id: 1, name: 'One' },
    { id: 2, name: 'Two' },
    { id: 3, name: 'Three' },
    { id: 4, name: 'Four' },
    { id: 5, name: 'Five' },
];

@Component({
    templateUrl: './combo-box-test.component.html',
})
export class ComboBoxTestComponent {
    private data$$: BehaviorSubject<ReadonlyArray<IItem>>;
    public data$: Observable<ReadonlyArray<IItem>>;

    value: number | null;

    constructor() {
        this.data$$ = new BehaviorSubject(ITEMS as ReadonlyArray<IItem>);
        this.data$ = this.data$$.asObservable();

        this.value = null;
    }

    search(value: string | null): void {
        console.log('search for: ', value);

        const filtered = !!value
            ? ITEMS.filter((item) => item.name.match(value))
            : ITEMS;

        this.data$$.next(filtered);
    }

    selected(item: any): void {
        console.log('selected: ', item);
    }
}

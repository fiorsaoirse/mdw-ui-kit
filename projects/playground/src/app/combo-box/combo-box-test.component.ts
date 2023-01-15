import { Component } from '@angular/core';
import { MD_MIN_COMBO_BOX_SEARCH_LENGTH } from 'projects/md-ui-kit/combo-box/src';
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
    providers: [{ provide: MD_MIN_COMBO_BOX_SEARCH_LENGTH, useValue: 1 }],
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
        const filtered = !!value
            ? ITEMS.filter((item) => {
                  return (
                      item.name.match(new RegExp(value, 'i')) ||
                      item.id.toString() === value
                  );
              })
            : ITEMS;

        this.data$$.next(filtered);
    }

    selected(item: any): void {
        console.log('selected: ', item);
    }

    log(): void {
        console.log('current value: ', this.value);
    }
}

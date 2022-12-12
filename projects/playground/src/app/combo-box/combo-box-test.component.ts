import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface IItem {
    id: number;
    name: string;
}

@Component({
    templateUrl: './combo-box-test.component.html',
})
export class ComboBoxTestComponent {
    private data$$: BehaviorSubject<ReadonlyArray<IItem>>;
    public data$: Observable<ReadonlyArray<IItem>>;

    value: number | null;

    constructor() {
        this.data$$ = new BehaviorSubject([] as ReadonlyArray<IItem>);
        this.data$ = this.data$$.asObservable();

        this.value = null;
    }

    update(): void {
        const items: Array<IItem> = [
            { id: 1, name: 'One' },
            { id: 2, name: 'Two' },
            { id: 3, name: 'Three' },
            { id: 4, name: 'Four' },
            { id: 5, name: 'Five' },
        ];

        this.data$$.next(items);
    }
}

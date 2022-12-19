import { Component } from '@angular/core';
import { MdContext } from 'md-ui-kit/common';

interface IItem {
    name: string;
    value: number;
}

@Component({
    templateUrl: './accordion.component.html',
})
export class AccordionTestComponent {
    readonly data: ReadonlyArray<IItem>;

    constructor() {
        this.data = [
            { name: 'Foo', value: 1 },
            { name: 'Bar', value: 2 },
            { name: 'Baz', value: 3 },
            { name: 'FooBar', value: 4 },
        ];
    }

    getContext(item: IItem): MdContext<IItem> {
        return new MdContext(item);
    }
}

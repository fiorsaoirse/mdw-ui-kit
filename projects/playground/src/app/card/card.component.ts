import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MdContext } from 'md-ui-kit/contracts';
import { forkJoin, map } from 'rxjs';

interface ICardItem {
    name: string;
    description?: string;
    context: MdContext;
}

const CAT_API = 'https://api.thecatapi.com/v1/images/search';

@Component({
    templateUrl: './card.component.html',
})
export class CardTestComponent {
    cats: ReadonlyArray<ICardItem>;

    constructor(private readonly http: HttpClient) {
        const data = [
            { name: 'Thomas', description: 'Cat the great' },
            { name: 'Jojo', description: 'Funny little dude' },
            { name: 'Ben', description: 'My best friend' },
        ];

        this.cats = [];

        forkJoin([
            this.http.get<Array<{ url: string }>>(CAT_API),
            this.http.get<Array<{ url: string }>>(CAT_API),
            this.http.get<Array<{ url: string }>>(CAT_API),
        ])
            .pipe(
                map((items) =>
                    items.map(([item], index) => {
                        return {
                            ...data[index],
                            context: new MdContext(item.url),
                        };
                    }),
                ),
            )
            .subscribe((cats) => {
                this.cats = cats;
            });
    }

    sayHi(): void {
        window.alert('Hi!');
    }
}

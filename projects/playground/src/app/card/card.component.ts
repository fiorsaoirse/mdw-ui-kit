import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { MdContext } from 'md-ui-kit/common';
import { map, Observable, scan, Subject, switchMap, tap, zip } from 'rxjs';

interface ICardItem {
    id: string;
    breed: string;
    temperament?: string;
    context: MdContext<string>;
}

interface IApiBreed {
    name: string;
    temperament: string;
}

interface IApiItemWithBreed extends IApiItem {
    breeds: Array<IApiBreed>;
}

interface IApiItem {
    id: string;
    url: string;
}

const CAT_API =
    'https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1';

const CAT_API_ID = 'https://api.thecatapi.com/v1/images/';

@Component({
    templateUrl: './card.component.html',
})
export class CardTestComponent implements AfterViewInit {
    cats$: Observable<ReadonlyArray<ICardItem>>;
    loadMore$: Subject<void>;

    constructor(private readonly http: HttpClient) {
        this.loadMore$ = new Subject();

        this.cats$ = this.loadMore$.pipe(
            tap(() => {
                console.log('loading data...');
            }),
            switchMap(() => this.http.get<Array<IApiItem>>(CAT_API)),
            switchMap((items) => {
                const req = items.map((item) =>
                    this.http.get<IApiItemWithBreed>(CAT_API_ID + item.id).pipe(
                        map((item) => {
                            const [breed] = item.breeds;
                            return <ICardItem>{
                                id: item.id,
                                breed: breed?.name,
                                temperament: breed?.temperament,
                                context: new MdContext(item.url),
                            };
                        }),
                    ),
                );

                return zip(req);
            }),
            scan((items: Array<ICardItem>, values: Array<ICardItem>) => {
                return items.concat(values);
            }, []),
            tap((items) => {
                console.log(items);
            }),
        );
    }

    trackBy(_index: number, item: ICardItem): string {
        return item.id;
    }

    ngAfterViewInit(): void {
        this.loadMore$.next();
    }

    sayHi(): void {
        window.alert('Hi!');
    }
}

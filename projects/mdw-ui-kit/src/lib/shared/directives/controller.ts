import { OnChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export abstract class Controller<T = any> implements OnChanges {
    private readonly _changes$: Subject<void>;

    constructor() {
        this._changes$ = new Subject();
    }

    public ngOnChanges(): void {
        this._changes$.next();
    }

    get changes$(): Observable<void> {
        return this._changes$.asObservable();
    }
}
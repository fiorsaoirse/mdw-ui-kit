import { Directive, OnChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface IControllerChange {
    source: ControllerDirective;
}

@Directive({})
export abstract class ControllerDirective implements OnChanges {
    private readonly _changes$: Subject<IControllerChange>;

    constructor() {
        this._changes$ = new Subject();
    }

    public ngOnChanges(): void {
        console.log('changes!');

        this._changes$.next({
            source: this
        });
    }

    get changes$(): Observable<IControllerChange> {
        return this._changes$.asObservable();
    }
}
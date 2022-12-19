import { Directive, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface IMdControllerChange {
    source: MdBaseControllerDirective;
    changes: SimpleChanges;
}

@Directive()
export abstract class MdBaseControllerDirective implements OnChanges {
    private readonly _changes$: Subject<IMdControllerChange>;

    constructor() {
        this._changes$ = new Subject();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this._changes$.next({ source: this, changes });
    }

    get changes$(): Observable<IMdControllerChange> {
        return this._changes$.asObservable();
    }
}

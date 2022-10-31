import { Directive, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { MdOnDestroy, MdSize } from '../shared';
import { FieldState } from './contracts';

@Directive({})
// tslint:disable-next-line: directive-class-suffix
export abstract class BaseField {
    protected readonly state$$: Subject<FieldState>;

    abstract small: boolean;

    abstract large: boolean;

    abstract size: MdSize;

    abstract disabled: boolean;

    // protected readonly destroy$: MdOnDestroy;

    constructor() {
        this.state$$ = new Subject();
        // this.destroy$ = inject(MdOnDestroy);
    }
}
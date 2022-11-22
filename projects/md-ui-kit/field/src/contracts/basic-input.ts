import { Directive, HostListener, inject } from '@angular/core';
import { MdOnDestroy } from 'md-ui-kit/common';
import { MdSize } from 'md-ui-kit/contracts';
import { BooleanInput, coerceBooleanInput } from 'md-ui-kit/utils';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import {
    MdInputWatchedController,
    MD_INPUT_WATCHED_CONTROLLER,
    MD_INPUT_WATCHED_PROVIDER,
} from './basic-input-controller';
import { MdFieldState } from './field-state';

@Directive({
    providers: [MdOnDestroy, MD_INPUT_WATCHED_PROVIDER],
})
export abstract class MdInput {
    private readonly controller: MdInputWatchedController;
    private readonly destroy$: MdOnDestroy;
    private readonly fieldState: ReplaySubject<MdFieldState>;

    public readonly fieldStateChanged: Observable<MdFieldState>;

    constructor() {
        console.log('constr');
        this.controller = inject(MD_INPUT_WATCHED_CONTROLLER);
        console.log('controller');

        this.destroy$ = inject(MdOnDestroy);

        this.fieldState = new ReplaySubject(1);
        this.fieldStateChanged = this.fieldState.asObservable();

        this.fieldState.next(MdFieldState.Filling);

        this.controller.changes$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                if (this.controller.isDisabled) {
                    this.fieldState.next(MdFieldState.Disabled);
                    return;
                }

                if (this.controller.isReadonly) {
                    this.fieldState.next(MdFieldState.Readonly);
                    return;
                }

                this.fieldState.next(MdFieldState.Filling);
            });
    }

    @HostListener('focus', ['true'])
    @HostListener('blur', ['false'])
    private focusListener(focused: BooleanInput): void {
        console.log('foo');

        const nextState = coerceBooleanInput(focused)
            ? MdFieldState.Focused
            : MdFieldState.Filling;
        this.fieldState.next(nextState);
    }

    public get size(): MdSize {
        return this.controller.size;
    }

    public get isReadonly(): boolean {
        return this.controller.isReadonly;
    }

    public get isDisabled(): boolean {
        return this.controller.isDisabled;
    }
}

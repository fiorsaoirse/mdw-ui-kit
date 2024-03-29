import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { MdOnDestroy } from 'md-ui-kit/common';
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
    private readonly fieldState$$: ReplaySubject<MdFieldState>;

    public readonly elementRef: ElementRef;
    public readonly fieldState$: Observable<MdFieldState>;

    constructor() {
        this.controller = inject(MD_INPUT_WATCHED_CONTROLLER);
        this.destroy$ = inject(MdOnDestroy);
        this.elementRef = inject(ElementRef);

        this.fieldState$$ = new ReplaySubject(1);
        this.fieldState$ = this.fieldState$$.asObservable();

        let initialState;

        if (this.controller.isDisabled) {
            initialState = MdFieldState.Disabled;
        } else if (this.controller.isReadonly) {
            initialState = MdFieldState.Readonly;
        } else {
            initialState = MdFieldState.None;
        }

        this.fieldState$$.next(initialState);

        this.controller.changes$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                if (this.controller.isDisabled) {
                    this.fieldState$$.next(MdFieldState.Disabled);
                    return;
                }

                if (this.controller.isReadonly) {
                    this.fieldState$$.next(MdFieldState.Readonly);
                    return;
                }

                this.fieldState$$.next(MdFieldState.None);
            });
    }

    @HostListener('focus', ['true'])
    @HostListener('blur', ['false'])
    private focusListener(focused: BooleanInput): void {
        const nextState = coerceBooleanInput(focused)
            ? MdFieldState.Focused
            : MdFieldState.None;

        this.fieldState$$.next(nextState);
    }

    public get isReadonly(): boolean {
        return this.controller.isReadonly;
    }

    public get isDisabled(): boolean {
        return this.controller.isDisabled;
    }
}

import { ChangeDetectorRef, InjectionToken, Provider } from '@angular/core';
import {
    MdDisabledControllerDirective,
    MdOnDestroy,
    MdReadonlyControllerDirective,
    MD_DISABLED,
    MD_READONLY,
    noop,
} from 'md-ui-kit/common';
import { merge, Observable, takeUntil, tap } from 'rxjs';

const mdInputControllerFactory = (
    changeDetectorRef: ChangeDetectorRef,
    destroy$: MdOnDestroy,
    ...controllers: [
        MdDisabledControllerDirective,
        MdReadonlyControllerDirective,
    ]
): MdInputWatchedController => {
    const changes$ = merge(...controllers.map(({ changes$ }) => changes$)).pipe(
        tap(() => {
            changeDetectorRef.detectChanges();
        }),
        noop(),
        takeUntil(destroy$),
    );

    changes$.subscribe();

    return new MdInputWatchedController(changes$, ...controllers);
};

export const MD_INPUT_WATCHED_CONTROLLER =
    new InjectionToken<MdInputWatchedController>('MdInputWatchedController');

export const MD_INPUT_WATCHED_PROVIDER: Provider = {
    provide: MD_INPUT_WATCHED_CONTROLLER,
    useFactory: mdInputControllerFactory,
    deps: [ChangeDetectorRef, MdOnDestroy, MD_DISABLED, MD_READONLY],
};

export class MdInputWatchedController {
    constructor(
        readonly changes$: Observable<void>,
        private readonly disabledController: MdDisabledControllerDirective,
        private readonly readonlyController: MdReadonlyControllerDirective,
    ) {}

    public get isDisabled(): boolean {
        return this.disabledController.disabled;
    }

    public get isReadonly(): boolean {
        return this.readonlyController.readonly;
    }
}

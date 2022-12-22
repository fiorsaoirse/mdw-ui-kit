import { ChangeDetectorRef, InjectionToken, Provider } from '@angular/core';
import {
    MdDisabledControllerDirective,
    MdOnDestroy,
    MdReadonlyControllerDirective,
    MdSize,
    MdSizeControllerDirective,
    MD_DISABLED,
    MD_READONLY,
    MD_SIZE,
    noop,
} from 'md-ui-kit/common';
import { merge, Observable, takeUntil, tap } from 'rxjs';

const mdTextFieldControllerFactory = (
    changeDetectorRef: ChangeDetectorRef,
    destroy$: MdOnDestroy,
    ...controllers: [
        MdDisabledControllerDirective,
        MdReadonlyControllerDirective,
        MdSizeControllerDirective,
    ]
): MdTextFieldWatchedController => {
    const changes$ = merge(...controllers.map(({ changes$ }) => changes$)).pipe(
        tap(() => {
            changeDetectorRef.detectChanges();
        }),
        noop(),
        takeUntil(destroy$),
    );

    changes$.subscribe();

    return new MdTextFieldWatchedController(changes$, ...controllers);
};

export const MD_TEXTFIELD_WATCHED_CONTROLLER =
    new InjectionToken<MdTextFieldWatchedController>(
        'MdTextFieldWatchedController',
    );

export const MD_TEXTFIELD_WATCHED_PROVIDER: Provider = {
    provide: MD_TEXTFIELD_WATCHED_CONTROLLER,
    useFactory: mdTextFieldControllerFactory,
    deps: [ChangeDetectorRef, MdOnDestroy, MD_DISABLED, MD_READONLY, MD_SIZE],
};

export class MdTextFieldWatchedController {
    constructor(
        readonly changes$: Observable<void>,
        private readonly disabledController: MdDisabledControllerDirective,
        private readonly readonlyController: MdReadonlyControllerDirective,
        private readonly sizeController: MdSizeControllerDirective,
    ) {}

    public get isDisabled(): boolean {
        return this.disabledController.disabled;
    }

    public get isReadonly(): boolean {
        return this.readonlyController.readonly;
    }

    public get size(): MdSize {
        return this.sizeController.size;
    }
}

import { ChangeDetectorRef, InjectionToken, Provider } from '@angular/core';
import {
    MdDisabledControllerDirective,
    MdOnDestroy,
    MdReadonlyControllerDirective,
    MdSizeControllerDirective,
    MD_DISABLED,
    MD_READONLY,
    MD_SIZE,
    noop,
} from 'md-ui-kit/common';
import { MdSize } from 'md-ui-kit/contracts';
import { merge, Observable, takeUntil, tap } from 'rxjs';

const mdInputControllerFactory = (
    changeDetectorRef: ChangeDetectorRef,
    destroy$: MdOnDestroy,
    ...controllers: [
        MdDisabledControllerDirective,
        MdReadonlyControllerDirective,
        MdSizeControllerDirective,
    ]
): MdInputWatchedController => {
    console.log('factory');

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
    deps: [ChangeDetectorRef, MdOnDestroy, MD_DISABLED, MD_READONLY, MD_SIZE],
};

export class MdInputWatchedController {
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

import { ChangeDetectorRef, InjectionToken, Provider } from '@angular/core';
import {
    MdDisabledControllerDirective,
    MdOnDestroy,
    MdSizeControllerDirective,
    MD_DISABLED,
    MD_SIZE,
    noop,
} from 'md-ui-kit/common';
import { MdSize } from 'md-ui-kit/contracts';
import { merge, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

const mdButtonWatchedControllerFactory = (
    changeDetectorRef: ChangeDetectorRef,
    destroy$: MdOnDestroy,
    ...controllers: [MdSizeControllerDirective, MdDisabledControllerDirective]
): MdButtonWatchedController => {
    const mergedChanges$ = merge(
        ...controllers.map(({ changes$ }) => changes$),
    ).pipe(
        tap(() => {
            changeDetectorRef.detectChanges();
        }),
        noop(),
        takeUntil(destroy$),
    );

    mergedChanges$.subscribe();

    return new MdButtonWatchedController(mergedChanges$, ...controllers);
};

export const MD_BUTTON_WATCHED_CONTROLLER =
    new InjectionToken<MdButtonWatchedController>(
        'md button watched controller',
    );

export const MD_BUTTON_WATCHED_PROVIDER: Provider = {
    provide: MD_BUTTON_WATCHED_CONTROLLER,
    deps: [ChangeDetectorRef, MdOnDestroy, MD_SIZE, MD_DISABLED],
    useFactory: mdButtonWatchedControllerFactory,
};

export class MdButtonWatchedController {
    constructor(
        readonly changes$: Observable<void>,
        private readonly sizeDirective: MdSizeControllerDirective,
        private readonly disabledDirective: MdDisabledControllerDirective,
    ) {}

    public get isSmall(): boolean {
        return this.sizeDirective.size === MdSize.Small;
    }

    public get isMedium(): boolean {
        return this.sizeDirective.size === MdSize.Medium;
    }

    public get isLarge(): boolean {
        return this.sizeDirective.size === MdSize.Large;
    }

    public get size(): MdSize {
        return this.sizeDirective.size;
    }

    public get disabled(): boolean {
        return this.disabledDirective.disabled;
    }
}

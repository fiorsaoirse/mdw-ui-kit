import { ChangeDetectorRef, InjectionToken, Provider } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { MdOnDestroy, MdSize, MdSizeControllerDirective, MD_SIZE, noop } from '../shared';
import { MdDisabledControllerDirective, MD_DISABLED } from '../shared/directives/disabled/disabled.directive';

const mdButtonWatchedControllerFactory = (
    changeDetectorRef: ChangeDetectorRef,
    destroy$: MdOnDestroy,
    ...controllers: [
        MdSizeControllerDirective,
        MdDisabledControllerDirective
    ]
): MdButtonWatchedController => {
    const mergedChanges$ = merge(...controllers.map(({ changes$ }) => changes$))
        .pipe(
            tap(() => {
                changeDetectorRef.detectChanges();
            }),
            noop(),
            takeUntil(destroy$)
        );

    mergedChanges$.subscribe();

    return new MdButtonWatchedController(mergedChanges$, ...controllers);
};

export const MD_BUTTON_WATCHED_CONTROLLER = new InjectionToken<MdButtonWatchedController>(
    'md button watched controller'
);

export const MD_BUTTON_WATCHED_PROVIDER: Provider = {
    provide: MD_BUTTON_WATCHED_CONTROLLER,
    deps: [
        ChangeDetectorRef,
        MdOnDestroy,
        MD_SIZE,
        MD_DISABLED
    ],
    useFactory: mdButtonWatchedControllerFactory
};

export class MdButtonWatchedController {
    constructor(
        readonly changes$: Observable<void>,
        private readonly sizeDirecrive: MdSizeControllerDirective,
        private readonly disabledDirective: MdDisabledControllerDirective
    ) { }

    get isSmall(): boolean {
        return this.sizeDirecrive.size === MdSize.Small;
    }

    get isMedium(): boolean {
        return this.sizeDirecrive.size === MdSize.Medium;
    }

    get isLarge(): boolean {
        return this.sizeDirecrive.size === MdSize.Large;
    }

    get size(): MdSize {
        return this.sizeDirecrive.size;
    }

    get disabled(): boolean {
        return this.disabledDirective.disabled;
    }
}

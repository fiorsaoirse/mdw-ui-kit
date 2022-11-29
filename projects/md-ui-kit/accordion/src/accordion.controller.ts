import { ChangeDetectorRef, InjectionToken, Provider } from '@angular/core';
import {
    MdDisabledControllerDirective,
    MdOnDestroy,
    MdSize,
    MdSizeControllerDirective,
    MD_DISABLED,
    MD_SIZE,
    noop,
} from 'md-ui-kit/common';
import { merge, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

const mdAccordionWatchedControllerFactory = (
    changeDetectorRef: ChangeDetectorRef,
    destroy$: MdOnDestroy,
    ...controllers: [MdDisabledControllerDirective, MdSizeControllerDirective]
): MdAccordionWatchedController => {
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

    return new MdAccordionWatchedController(mergedChanges$, ...controllers);
};

export const MD_ACCORDION_WATCHED_CONTROLLER =
    new InjectionToken<MdAccordionWatchedController>(
        'md accordion watched controller',
    );

/**
 * Here we use a provider to declare a factory that calls changeDetectorRef.detectChanges()
 * outside the meta-controller. So the controller receives only the stream with changes
 * and doesn't take care of detecting changes
 */
export const MD_ACCORDION_WATCHED_PROVIDER: Provider = {
    provide: MD_ACCORDION_WATCHED_CONTROLLER,
    deps: [ChangeDetectorRef, MdOnDestroy, MD_DISABLED, MD_SIZE],
    useFactory: mdAccordionWatchedControllerFactory,
};

export class MdAccordionWatchedController {
    constructor(
        readonly changes$: Observable<void>,
        private readonly disabledController: MdDisabledControllerDirective,
        private readonly sizeController: MdSizeControllerDirective,
    ) {}

    public get disabled(): boolean {
        return this.disabledController.disabled;
    }

    public get isSmall(): boolean {
        return this.sizeController.size === MdSize.Small;
    }

    public get isMedium(): boolean {
        return this.sizeController.size === MdSize.Medium;
    }

    public get isLarge(): boolean {
        return this.sizeController.size === MdSize.Large;
    }

    public get size(): MdSize {
        return this.sizeController.size;
    }
}

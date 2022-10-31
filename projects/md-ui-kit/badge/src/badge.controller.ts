import { ChangeDetectorRef, InjectionToken, Provider } from '@angular/core';
import {
    MdOnDestroy,
    MdRemovableControllerDirective,
    MdSizeControllerDirective,
    MD_REMOVABLE,
    MD_SIZE,
    noop,
} from 'md-ui-kit/common';
import { MdSize } from 'md-ui-kit/contracts';
import { merge, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

const mdBadgeWatchedControllerFactory = (
    changeDetectorRef: ChangeDetectorRef,
    destroy$: MdOnDestroy,
    ...controllers: [MdRemovableControllerDirective, MdSizeControllerDirective]
): MdBadgeWatchedController => {
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

    return new MdBadgeWatchedController(mergedChanges$, ...controllers);
};

export const MD_BADGE_WATCHED_CONTROLLER =
    new InjectionToken<MdBadgeWatchedController>('md badge watched controller');

/**
 * Here we use a provider to declare a factory that calls changeDetectorRef.detectChanges()
 * outside the meta-controller. So the controller receives only the stream with changes
 * and doesn't take care of detecting changes
 */
export const MD_BADGE_WATCHED_PROVIDER: Provider = {
    provide: MD_BADGE_WATCHED_CONTROLLER,
    deps: [ChangeDetectorRef, MdOnDestroy, MD_REMOVABLE, MD_SIZE],
    useFactory: mdBadgeWatchedControllerFactory,
};

export class MdBadgeWatchedController {
    constructor(
        readonly changes$: Observable<void>,
        private readonly removableController: MdRemovableControllerDirective,
        private readonly sizeController: MdSizeControllerDirective,
    ) {}

    public get removable(): boolean {
        return this.removableController.removable;
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

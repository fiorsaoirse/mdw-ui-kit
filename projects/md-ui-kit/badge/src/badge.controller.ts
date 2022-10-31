import { ChangeDetectorRef, InjectionToken, Provider } from '@angular/core';
import {
    MdRemovableControllerDirective,
    MdSizeControllerDirective,
    MD_REMOVABLE,
    MD_SIZE,
} from '@fiorsaoirse/mdw-ui-kit/common';
import { MdSize } from '@fiorsaoirse/mdw-ui-kit/contracts';
import { noop } from '@fiorsaoirse/mdw-ui-kit/utils';
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
 * Используем провайдер для того, чтобы определить внутри фабрику, внутри которой будет
   происходить проверка изменений (changeDetectorRef) и подписка, т.е.
   не делать этого внутри самого MdBadgeWatchedController
 */
export const MD_BADGE_WATCHED_PROVIDER: Provider = {
    provide: MD_BADGE_WATCHED_CONTROLLER,
    deps: [ChangeDetectorRef, MdOnDestroy, MD_REMOVABLE, MD_SIZE],
    useFactory: mdBadgeWatchedControllerFactory,
};

export class MdBadgeWatchedController {
    constructor(
        readonly changes$: Observable<void>,
        private readonly clearableDirective: MdClearableControllerDirective,
        private readonly sizeDirective: MdSizeControllerDirective,
    ) {}

    public get clearable(): boolean {
        return this.clearableDirective.clearable;
    }

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
}

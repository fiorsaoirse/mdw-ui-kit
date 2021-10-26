import { ChangeDetectorRef, InjectionToken, Provider } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { MdOnDestroy, MdClearableControllerDirective, MdSize, MdSizeControllerDirective, MD_CLEARABLE, MD_SIZE, noop } from '../shared';

const mdBadgeWatchedControllerFactory = (
    changeDetectorRef: ChangeDetectorRef,
    destroy$: MdOnDestroy,
    ...controllers: [
        MdClearableControllerDirective,
        MdSizeControllerDirective
    ]
): MdBadgeWatchedController => {
    const mergedChanges$ = merge(...controllers.map(({ changes$ }) => changes$))
        .pipe(
            tap(() => {
                changeDetectorRef.detectChanges();
            }),
            noop(),
            takeUntil(destroy$)
        );

    mergedChanges$.subscribe();

    return new MdBadgeWatchedController(mergedChanges$, ...controllers);
};

export const MD_BADGE_WATCHED_CONTROLLER = new InjectionToken<MdBadgeWatchedController>(
    'md badge watched controller'
);

// Используем провайдер для того, чтобы определить внутри фабрику, внутри которой будет
// происходить проверка изменений (changeDetectorRef) и подписка, т.е.
// не делать этого внутри самого MdBadgeWatchedController
export const MD_BADGE_WATCHED_PROVIDER: Provider = {
    provide: MD_BADGE_WATCHED_CONTROLLER,
    deps: [
        ChangeDetectorRef,
        MdOnDestroy,
        MD_CLEARABLE,
        MD_SIZE
    ],
    useFactory: mdBadgeWatchedControllerFactory
};

// WatchedController служит контейнером для всех остальных контроллеров, чтобы
// не приходилось каждый инжектить в компонент бейджа и разруливать там
// изменения
export class MdBadgeWatchedController {
    constructor(
        readonly changes$: Observable<void>,
        private readonly clearableDirective: MdClearableControllerDirective,
        private readonly sizeDirecrive: MdSizeControllerDirective
    ) { }

    get clearable(): boolean {
        return this.clearableDirective.clearable;
    }

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
}

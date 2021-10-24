import { ChangeDetectorRef, InjectionToken, Provider } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { MdRemovableControllerDirective, MD_REMOVABLE } from '../shared/directives/removable/removable.directive';
import { MdSize, MdSizeControllerDirective, MD_SIZE } from '../shared/directives/size/size.directive';
import { MdOnDestroy } from '../shared/services/destroy/destroy.service';

const mdBadgeWatchedControllerFactory = (
    changeDetectorRef: ChangeDetectorRef,
    destroy$: MdOnDestroy,
    ...controllers: [
        MdRemovableControllerDirective,
        MdSizeControllerDirective
    ]
): MdBadgeWatchedController => {
    const mergedChanges$ = merge(...controllers.map(({ changes$ }) => changes$));
    mergedChanges$.pipe(
        tap(() => {
            changeDetectorRef.detectChanges();
        }),
        takeUntil(destroy$)
    ).subscribe();

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
        MD_REMOVABLE,
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
        private readonly removableDirective: MdRemovableControllerDirective,
        private readonly sizeDirecrive: MdSizeControllerDirective
    ) { }

    get removable(): boolean {
        return this.removableDirective.removable;
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

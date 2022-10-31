import { ChangeDetectorRef, InjectionToken, Provider } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { tap, takeUntil, map } from 'rxjs/operators';
import { MdOnDestroy, MdSize, MdSizeControllerDirective, MD_CLEARABLE, MD_SIZE } from '../shared';

const mdCardWatchedControllerFactory = (
    changeDetectorRef: ChangeDetectorRef,
    destroy$: MdOnDestroy,
    ...controllers: [
        MdSizeControllerDirective
    ]
): MdCardWatchedController => {
    const mergedChanges$ = merge(...controllers.map(({ changes$ }) => changes$));

    mergedChanges$.pipe(
        tap(() => {
            changeDetectorRef.detectChanges();
        }),
        takeUntil(destroy$)
    ).subscribe();

    const noopedChanges$ = mergedChanges$.pipe(
        map(() => {
            return;
        })
    );

    return new MdCardWatchedController(noopedChanges$, ...controllers);
};

export const MD_CARD_WATCHED_CONTROLLER = new InjectionToken<MdCardWatchedController>(
    'md card watched controller'
);

export const MD_CARD_WATCHED_PROVIDER: Provider = {
    provide: MD_CARD_WATCHED_CONTROLLER,
    deps: [
        ChangeDetectorRef,
        MdOnDestroy,
        MD_SIZE
    ],
    useFactory: mdCardWatchedControllerFactory
};

export class MdCardWatchedController {
    constructor(
        readonly changes$: Observable<void>,
        private readonly sizeDirective: MdSizeControllerDirective
    ) { }

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

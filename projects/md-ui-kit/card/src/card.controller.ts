import { ChangeDetectorRef, InjectionToken, Provider } from '@angular/core';
import {
    MdHoverableControllerDirective,
    MdOnDestroy,
    MD_HOVERABLE,
    noop,
} from 'md-ui-kit/common';
import { merge, Observable, takeUntil, tap } from 'rxjs';

const mdCardControllerFactory = (
    changeDetectorRef: ChangeDetectorRef,
    destroy$: MdOnDestroy,
    ...controllers: [MdHoverableControllerDirective]
): MdCardWatchedController => {
    const changes$ = merge(...controllers.map(({ changes$ }) => changes$)).pipe(
        tap(() => {
            changeDetectorRef.detectChanges();
        }),
        noop(),
        takeUntil(destroy$),
    );

    changes$.subscribe();

    return new MdCardWatchedController(changes$, ...controllers);
};

export const MD_CARD_WATCHED_CONTROLLER =
    new InjectionToken<MdCardWatchedController>('MdCardWatchedController');

export const MD_CARD_WATCHED_PROVIDER: Provider = {
    provide: MD_CARD_WATCHED_CONTROLLER,
    useFactory: mdCardControllerFactory,
    deps: [ChangeDetectorRef, MdOnDestroy, MD_HOVERABLE],
};

export class MdCardWatchedController {
    constructor(
        readonly changes$: Observable<void>,
        private readonly hoverableController: MdHoverableControllerDirective,
    ) {}

    public get isHoverable(): boolean {
        return this.hoverableController.hoverable;
    }
}

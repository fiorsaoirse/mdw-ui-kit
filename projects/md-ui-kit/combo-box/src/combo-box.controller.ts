import { ChangeDetectorRef, InjectionToken, Provider } from '@angular/core';
import {
    MdDisabledControllerDirective,
    MdOnDestroy,
    MdReadonlyControllerDirective,
    MdRemovableControllerDirective,
    MdSize,
    MdSizeControllerDirective,
    MD_DISABLED,
    MD_READONLY,
    MD_REMOVABLE,
    MD_SIZE,
    noop,
} from 'md-ui-kit/common';
import { merge, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

const mdComboBoxWatchedControllerFactory = (
    changeDetectorRef: ChangeDetectorRef,
    destroy$: MdOnDestroy,
    ...controllers: [
        MdRemovableControllerDirective,
        MdDisabledControllerDirective,
        MdReadonlyControllerDirective,
        MdSizeControllerDirective,
    ]
): MdComboBoxWatchedController => {
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

    return new MdComboBoxWatchedController(mergedChanges$, ...controllers);
};

export const MD_COMBO_BOX_WATCHED_CONTROLLER =
    new InjectionToken<MdComboBoxWatchedController>(
        'md combo-box watched controller',
    );

/**
 * Here we use a provider to declare a factory that calls changeDetectorRef.detectChanges()
 * outside the meta-controller. So the controller receives only the stream with changes
 * and doesn't take care of detecting changes
 */
export const MD_COMBO_BOX_WATCHED_PROVIDER: Provider = {
    provide: MD_COMBO_BOX_WATCHED_CONTROLLER,
    deps: [
        ChangeDetectorRef,
        MdOnDestroy,
        MD_REMOVABLE,
        MD_DISABLED,
        MD_READONLY,
        MD_SIZE,
    ],
    useFactory: mdComboBoxWatchedControllerFactory,
};

export class MdComboBoxWatchedController {
    constructor(
        readonly changes$: Observable<void>,
        private readonly removableController: MdRemovableControllerDirective,
        private readonly disabledController: MdDisabledControllerDirective,
        private readonly readonlyController: MdReadonlyControllerDirective,
        private readonly sizeController: MdSizeControllerDirective,
    ) {}

    public get removable(): boolean {
        return this.removableController.removable;
    }

    public get disabled(): boolean {
        return this.disabledController.disabled;
    }

    public get readonly(): boolean {
        return this.readonlyController.readonly;
    }

    public get size(): MdSize {
        return this.sizeController.size;
    }
}

import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Renderer2,
    SimpleChanges,
} from '@angular/core';

import { MdOnDestroy } from 'md-ui-kit/common';
import { MdButtonColor } from 'md-ui-kit/contracts';
import { extractProperty } from 'md-ui-kit/utils';
import { takeUntil } from 'rxjs';
import {
    MdButtonWatchedController,
    MD_BUTTON_WATCHED_CONTROLLER,
    MD_BUTTON_WATCHED_PROVIDER,
} from '../button.controller';

const BUTTON_CLASS = 'md-button';

@Component({
    selector: 'button[md-button], a[md-button]',
    templateUrl: './button.component.html',
    providers: [MD_BUTTON_WATCHED_PROVIDER, MdOnDestroy],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdButtonComponent implements OnInit, OnChanges {
    private static getColorCss(value: string): string {
        return `md-button-${value}`;
    }

    @Input() color?: MdButtonColor;

    constructor(
        private readonly renderer: Renderer2,
        private readonly elementRef: ElementRef,
        private readonly destroy$: MdOnDestroy,
        @Inject(MD_BUTTON_WATCHED_CONTROLLER)
        private readonly controller: MdButtonWatchedController,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        const colorChanges =
            changes[extractProperty<MdButtonComponent>('color')];

        if (colorChanges && !colorChanges.isFirstChange()) {
            const previous = MdButtonComponent.getColorCss(
                colorChanges.previousValue,
            );
            const current = MdButtonComponent.getColorCss(
                colorChanges.currentValue,
            );

            this.renderer.removeClass(this.elementRef.nativeElement, previous);
            this.renderer.addClass(this.elementRef.nativeElement, current);
        }
    }

    ngOnInit(): void {
        const initialColor = MdButtonComponent.getColorCss(
            this.color ?? MdButtonColor.Blue,
        );
        this.renderer.addClass(this.elementRef.nativeElement, BUTTON_CLASS);
        this.renderer.addClass(this.elementRef.nativeElement, initialColor);

        this.checkDisabled();

        this.controller.changes$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.checkDisabled();
            });
    }

    @HostBinding('class')
    private get classes() {
        return {
            [`md-button-${this.controller.size}`]: true,
            'md-button-disabled': this.controller.disabled,
        };
    }

    private checkDisabled(): void {
        if (this.controller.disabled) {
            this.renderer.setAttribute(
                this.elementRef.nativeElement,
                'disabled',
                'disabled',
            );
        } else {
            this.renderer.removeAttribute(
                this.elementRef.nativeElement,
                'disabled',
            );
        }
    }
}

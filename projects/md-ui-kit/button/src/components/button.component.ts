import {
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

import { MdButtonColor } from 'md-ui-kit/contracts';
import { extractProperty } from 'md-ui-kit/utils';
import {
    MdButtonWatchedController,
    MD_BUTTON_WATCHED_CONTROLLER,
    MD_BUTTON_WATCHED_PROVIDER,
} from '../button.controller';

const BUTTON_CLASS = 'md-button';

@Component({
    selector: 'button[md-button], a[md-button]',
    templateUrl: './button.component.html',
    providers: [MD_BUTTON_WATCHED_PROVIDER],
})
export class MdButtonComponent implements OnInit, OnChanges {
    private static getColorCss(value: string): string {
        return `md-button-${value}`;
    }

    @Input() color?: MdButtonColor;

    constructor(
        private readonly renderer: Renderer2,
        private readonly elementRef: ElementRef,
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
    }

    @HostBinding('class.md-button-large')
    private get large(): boolean {
        return this.controller.isLarge;
    }

    @HostBinding('class.md-button-medium')
    private get medium(): boolean {
        return this.controller.isMedium;
    }

    @HostBinding('class.md-button-small')
    private get small(): boolean {
        return this.controller.isSmall;
    }

    @HostBinding('class.md-button-disabled')
    private get disabled(): boolean {
        return this.controller.disabled;
    }
}

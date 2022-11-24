import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Optional,
    Output,
    Renderer2,
    SimpleChanges,
} from '@angular/core';
import {
    MdBadgeWatchedController,
    MD_BADGE_WATCHED_CONTROLLER,
    MD_BADGE_WATCHED_PROVIDER,
} from '../badge.controller';

import { BrowserModule } from '@angular/platform-browser';
import {
    MdCommonModule,
    MdOnDestroy,
    MD_CLOSE_ICON_URL,
} from 'md-ui-kit/common';
import { extractProperty } from 'md-ui-kit/utils';
import { MdSvgComponent } from 'projects/md-ui-kit/svg/src';
import { MdBadgeColor } from '../contracts/badge-color';

const BADGE_CLASS = 'md-badge';

@Component({
    selector: 'md-badge',
    templateUrl: './badge.component.html',
    providers: [MD_BADGE_WATCHED_PROVIDER, MdOnDestroy],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [BrowserModule, MdCommonModule, MdSvgComponent],
    standalone: true,
})
export class MdBadgeComponent implements OnInit, OnChanges {
    private static getColorCss(value: string): string {
        return `md-badge-${value}`;
    }

    @Input() color?: MdBadgeColor;

    @Output() public remove: EventEmitter<Event>;

    constructor(
        private readonly renderer: Renderer2,
        private readonly elementRef: ElementRef,
        @Inject(MD_BADGE_WATCHED_CONTROLLER)
        private readonly controller: MdBadgeWatchedController,
        @Optional()
        @Inject(MD_CLOSE_ICON_URL)
        readonly closeIconUrl?: string,
    ) {
        this.remove = new EventEmitter();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const colorChanges =
            changes[extractProperty<MdBadgeComponent>('color')];

        if (colorChanges && !colorChanges.isFirstChange()) {
            const previous = MdBadgeComponent.getColorCss(
                colorChanges.previousValue,
            );
            const current = MdBadgeComponent.getColorCss(
                colorChanges.currentValue,
            );

            this.renderer.removeClass(this.elementRef.nativeElement, previous);
            this.renderer.addClass(this.elementRef.nativeElement, current);
        }
    }

    ngOnInit(): void {
        const initialColor = MdBadgeComponent.getColorCss(
            this.color ?? MdBadgeColor.Blue,
        );
        this.renderer.addClass(this.elementRef.nativeElement, BADGE_CLASS);
        this.renderer.addClass(this.elementRef.nativeElement, initialColor);
    }

    @HostBinding('class')
    private get classes() {
        return {
            [`md-badge-${this.controller.size}`]: true,
        };
    }

    public get size(): string {
        return this.controller.size;
    }

    public get removable(): boolean {
        return this.controller.removable;
    }

    public onRemove(): void {
        this.remove.emit();
    }
}

import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
} from '@angular/core';
import {
    MdBadgeWatchedController,
    MD_BADGE_WATCHED_CONTROLLER,
    MD_BADGE_WATCHED_PROVIDER,
} from '../badge.controller';

import { MdBadgeColor } from 'md-ui-kit/contracts';
import { extractProperty } from 'md-ui-kit/utils';

const BADGE_CLASS = 'md-badge';

@Component({
    selector: 'md-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss'],
    providers: [MD_BADGE_WATCHED_PROVIDER],
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
            this.color ?? MdBadgeColor.Green,
        );
        this.renderer.addClass(this.elementRef.nativeElement, BADGE_CLASS);
        this.renderer.addClass(this.elementRef.nativeElement, initialColor);
    }

    @HostBinding('class.md-badge-large')
    private get large(): boolean {
        return this.controller.isLarge;
    }

    @HostBinding('class.md-badge-medium')
    private get medium(): boolean {
        return this.controller.isMedium;
    }

    @HostBinding('class.md-badge-small')
    private get small(): boolean {
        return this.controller.isSmall;
    }

    public get removable(): boolean {
        return this.controller.removable;
    }

    public onRemove(): void {
        this.remove.emit();
    }
}

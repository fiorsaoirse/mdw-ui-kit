import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    Output,
    Renderer2,
    ViewEncapsulation,
} from '@angular/core';
import { MdBadgeWatchedController, MD_BADGE_WATCHED_CONTROLLER, MD_BADGE_WATCHED_PROVIDER } from '../badge.controller';

type PrimitiveTypes = string | number;

@Component({
    selector: 'md-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        MD_BADGE_WATCHED_PROVIDER
    ]
})
export class MdBadgeComponent<T extends PrimitiveTypes, W> {
    @Input() value: T | null;

    @Input() item?: W;

    @Output() public removed: EventEmitter<W>;

    constructor(
        private readonly renderer: Renderer2,
        private readonly elementRef: ElementRef,
        @Inject(MD_BADGE_WATCHED_CONTROLLER) private readonly controller: MdBadgeWatchedController
    ) {
        this.value = null;
        this.removed = new EventEmitter<W>();

        this.renderer.addClass(this.elementRef.nativeElement, 'md-badge-container');
    }

    @HostBinding('class.md-badge-large')
    private get large(): boolean {
        return this.controller.isLarge;
    }

    @HostBinding('class.md-badge-small')
    private get small(): boolean {
        return this.controller.isSmall;
    }

    public get clearable(): boolean {
        return this.controller.clearable;
    }

    public onRemove(): void {
        this.removed.emit(this.item);
    }
}

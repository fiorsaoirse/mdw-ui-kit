import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    OnInit,
    Renderer2,
} from '@angular/core';
import {
    MdCommonModule,
    MdContent,
    MdContext,
    MdOnDestroy,
} from 'md-ui-kit/common';
import { isNumber } from 'md-ui-kit/utils';
import {
    MdCardWatchedController,
    MD_CARD_WATCHED_CONTROLLER,
    MD_CARD_WATCHED_PROVIDER,
} from '../card.controller';

@Component({
    selector: 'md-card',
    templateUrl: './card.component.html',
    standalone: true,
    imports: [MdCommonModule],
    providers: [MD_CARD_WATCHED_PROVIDER, MdOnDestroy],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdCardComponent implements OnInit {
    private _basis: string | null;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
        @Inject(MD_CARD_WATCHED_CONTROLLER)
        private readonly controller: MdCardWatchedController,
    ) {
        this._basis = null;
    }

    @Input() content: MdContent;
    @Input() context: MdContext | null = null;

    @Input() set basis(value: string | number) {
        if (isNumber(value)) {
            this._basis = `${value}px`;
        } else {
            this._basis = value;
        }
    }

    @HostBinding('style.flex-basis')
    private get cardWidth(): string | null {
        return this._basis;
    }

    @HostBinding('class')
    private get classes() {
        return {
            'md-card-hoverable': this.controller.isHoverable,
        };
    }

    ngOnInit(): void {
        this.renderer.addClass(this.elementRef.nativeElement, 'md-card');
    }
}

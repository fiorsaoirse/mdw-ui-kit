import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    Renderer2,
} from '@angular/core';
import { MdCommonModule, MdContent, MdContext } from 'md-ui-kit/common';
import { isNumber } from 'md-ui-kit/utils';

@Component({
    selector: 'md-card',
    templateUrl: './card.component.html',
    standalone: true,
    imports: [MdCommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdCardComponent implements OnInit {
    private _basis: string | null;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
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

    ngOnInit(): void {
        this.renderer.addClass(this.elementRef.nativeElement, 'md-card');
    }
}

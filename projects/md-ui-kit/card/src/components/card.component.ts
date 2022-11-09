import {
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    Renderer2,
} from '@angular/core';
import { MdContent, MdContext } from 'md-ui-kit/contracts';
import { isNumber } from 'md-ui-kit/utils';

@Component({
    selector: 'md-card',
    templateUrl: './card.component.html',
})
export class MdCardComponent implements OnInit {
    private _width: string | null;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
    ) {
        this._width = null;
    }

    @Input() content: MdContent;
    @Input() context: MdContext | null = null;

    @Input() set width(value: string | number) {
        if (isNumber(value)) {
            this._width = `${value}px`;
        } else {
            this._width = value;
        }
    }

    @HostBinding('style.width')
    private get cardWidth(): string | null {
        return this._width;
    }

    ngOnInit(): void {
        this.renderer.addClass(this.elementRef.nativeElement, 'md-card');
    }
}

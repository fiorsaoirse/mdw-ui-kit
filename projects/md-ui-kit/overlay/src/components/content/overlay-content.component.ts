import {
    Component,
    ElementRef,
    Input,
    OnInit,
    Renderer2,
    ViewContainerRef,
} from '@angular/core';

const OVERLAY_CONTENT_CLASS = 'md-overlay-content';

@Component({
    template: '',
})
export class MdOverlayContentComponent implements OnInit {
    @Input() readonly id!: number;

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
    ) {}

    ngOnInit(): void {
        this.renderer.addClass(
            this.elementRef.nativeElement,
            OVERLAY_CONTENT_CLASS,
        );
    }
}

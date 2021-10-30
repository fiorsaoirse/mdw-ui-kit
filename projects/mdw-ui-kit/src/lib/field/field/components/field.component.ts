import { Component, ElementRef, HostBinding, Inject, Renderer2 } from '@angular/core';
import { MdFieldWatchedController, MD_FIELD_WATCHED_CONTROLLER, MD_FIELD_WATCHED_PROVIDER } from '../field.controller';

@Component({
    selector: 'md-field',
    templateUrl: './field.component.html',
    providers: [MD_FIELD_WATCHED_PROVIDER]
})
export class MdFieldComponent {

    constructor(
        private readonly renderer: Renderer2,
        private readonly elementRef: ElementRef,
        @Inject(MD_FIELD_WATCHED_CONTROLLER) private readonly controller: MdFieldWatchedController
    ) {
        this.renderer.addClass(this.elementRef.nativeElement, 'md-field');
    }

    @HostBinding('class.md-large')
    private get large(): boolean {
        return this.controller.isLarge;
    }

    @HostBinding('class.md-small')
    private get small(): boolean {
        return this.controller.isSmall;
    }

    @HostBinding('class.md-disabled')
    private get disabled(): boolean {
        return this.controller.disabled;
    }
}
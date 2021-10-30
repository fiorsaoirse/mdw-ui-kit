import { Directive, ElementRef, HostBinding, Inject, Renderer2 } from '@angular/core';
import { MdButtonWatchedController, MD_BUTTON_WATCHED_CONTROLLER, MD_BUTTON_WATCHED_PROVIDER } from '../button.controller';

@Directive({
    selector: 'button[md-button]',
    providers: [
        MD_BUTTON_WATCHED_PROVIDER
    ]
})
export class MdButtonDirective {
    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
        @Inject(MD_BUTTON_WATCHED_CONTROLLER) private readonly controller: MdButtonWatchedController
    ) {
        this.renderer.addClass(this.elementRef.nativeElement, 'md-button');
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

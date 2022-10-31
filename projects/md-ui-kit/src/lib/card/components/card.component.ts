import { Component, ElementRef, HostBinding, Inject, Renderer2 } from '@angular/core';
import { MdCardWatchedController, MD_CARD_WATCHED_CONTROLLER, MD_CARD_WATCHED_PROVIDER } from '../card.controller';

@Component({
    selector: 'md-card',
    templateUrl: './card.component.html',
    providers: [
        MD_CARD_WATCHED_PROVIDER
    ]
})
export class MdCardComponent {
    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
        @Inject(MD_CARD_WATCHED_CONTROLLER) private readonly controller: MdCardWatchedController
    ) {
        this.renderer.addClass(this.elementRef.nativeElement, 'md-card');
    }
}

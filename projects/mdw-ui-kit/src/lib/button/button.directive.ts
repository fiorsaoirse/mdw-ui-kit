import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: 'button[md-button]',
})
export class MdButtonDirective {
    constructor(private readonly elementRef: ElementRef, private readonly renderer: Renderer2) {
        this.renderer.addClass(this.elementRef.nativeElement, 'md-button');
    }
}

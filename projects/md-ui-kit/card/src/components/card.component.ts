import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'md-card',
    templateUrl: './card.component.html',
})
export class MdCardComponent implements OnInit {
    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
    ) {}

    ngOnInit(): void {
        this.renderer.addClass(this.elementRef.nativeElement, 'md-card');
    }
}

import { Directive, ViewContainerRef } from '@angular/core';

@Directive({})
export class MdOverlayDirective {
    constructor(private readonly viewContainerRef: ViewContainerRef) {}
}

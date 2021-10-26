import { Component, ViewContainerRef } from '@angular/core';

@Component({
    template: `<div class="md-overlay"></div>`,
})
export class MdOverlayComponent {
    constructor(private readonly viewContainerRef: ViewContainerRef) { }
}

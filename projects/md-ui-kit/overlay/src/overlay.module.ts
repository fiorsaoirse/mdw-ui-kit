import { NgModule } from '@angular/core';
import { MdOverlayContainerComponent } from './components/container/overlay-container.component';

@NgModule({
    declarations: [MdOverlayContainerComponent],
    exports: [MdOverlayContainerComponent],
    bootstrap: [MdOverlayContainerComponent],
})
export class MdOverlayModule {}

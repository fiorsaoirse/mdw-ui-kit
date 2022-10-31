import { DOCUMENT } from '@angular/common';
import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Inject,
    Injectable,
    Injector,
} from '@angular/core';
import { MdOverlayComponent } from './overlay.component';

@Injectable({ providedIn: 'root' })
export class MdOverlayService {
    private overlayRef: ComponentRef<MdOverlayComponent> | null;

    private static getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        const [node] = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes;
        return node as HTMLElement;
    }

    constructor(
        private readonly applicationRef: ApplicationRef,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly parentInjector: Injector,
        @Inject(DOCUMENT) private readonly document: any
    ) {
        this.overlayRef = null;
    }

    public get containerOverlayRef(): ComponentRef<MdOverlayComponent> {
        if (!this.overlayRef) {
            this.overlayRef = this.createOverlay();
        }

        return this.overlayRef;
    }

    private createOverlay(): ComponentRef<MdOverlayComponent> {
        const factory = this.componentFactoryResolver.resolveComponentFactory(MdOverlayComponent);
        const overlayRef = factory.create(this.parentInjector);

        this.applicationRef.attachView(overlayRef.hostView);

        const node = MdOverlayService.getComponentRootNode(overlayRef);
        (this.document as Document).body.append(node);

        return overlayRef;
    }
}

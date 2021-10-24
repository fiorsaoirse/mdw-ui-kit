import { NgModule } from '@angular/core';
import { MdRemovableControllerDirective } from './directives/removable/removable.directive';
import { MdSizeControllerDirective } from './directives/size/size.directive';
import { MdOnDestroy } from './services/destroy/destroy.service';

@NgModule({
    declarations: [
        MdRemovableControllerDirective,
        MdSizeControllerDirective
    ],
    providers: [
        MdOnDestroy
    ],
    exports: [
        MdRemovableControllerDirective,
        MdSizeControllerDirective
    ]
})
export class MdSharedModule {
    constructor() { }
}
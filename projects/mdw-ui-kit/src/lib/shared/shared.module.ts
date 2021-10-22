import { NgModule } from '@angular/core';
import { MdwRemovableControllerDirective } from './directives/removable/removable.directive';
import { MdwLargeControllerDirective } from './directives/size/large-size.directive';
import { MdwSmallControllerDirective } from './directives/size/small-size.directive';
import { MdwOnDestroy } from './services/destroy/destroy.service';

@NgModule({
    declarations: [
        MdwRemovableControllerDirective,
        MdwLargeControllerDirective,
        MdwSmallControllerDirective
    ],
    providers: [
        MdwOnDestroy
    ],
    exports: [
        MdwRemovableControllerDirective,
        MdwLargeControllerDirective,
        MdwSmallControllerDirective
    ]
})
export class MdwSharedModule {
    constructor() { }
}
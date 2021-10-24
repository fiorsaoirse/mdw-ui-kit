import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdRemovableControllerDirective } from './directives/removable/removable.directive';
import { MdSizeControllerDirective } from './directives/size/size.directive';
import { MdOnDestroy } from './services/destroy/destroy.service';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule
    ],
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
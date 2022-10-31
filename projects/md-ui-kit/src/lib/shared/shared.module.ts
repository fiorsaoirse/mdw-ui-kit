import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdDisabledControllerDirective } from './directives/disabled/disabled.directive';
import { MdClearableControllerDirective } from './directives/clearable/clearable.directive';
import { MdSizeControllerDirective } from './directives/size/size.directive';
import { MdOnDestroy } from './services/destroy/destroy.service';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule
    ],
    declarations: [
        MdClearableControllerDirective,
        MdSizeControllerDirective,
        MdDisabledControllerDirective
    ],
    providers: [
        MdOnDestroy
    ],
    exports: [
        MdClearableControllerDirective,
        MdSizeControllerDirective,
        MdDisabledControllerDirective
    ]
})
export class MdSharedModule {
    constructor() { }
}
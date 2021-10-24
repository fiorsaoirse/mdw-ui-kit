import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdSharedModule } from '../shared/shared.module';
import { MdBadgeComponent } from './components/badge.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        MdSharedModule
    ],
    declarations: [MdBadgeComponent],
    exports: [MdBadgeComponent]
})
export class MdBadgeModule {
    constructor() { }
}
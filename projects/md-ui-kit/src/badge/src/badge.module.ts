import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdCommonModule } from '@fiorsaoirse/mdw-ui-kit/common';
import { MdBadgeComponent } from './components/badge.component';

@NgModule({
    imports: [BrowserModule, CommonModule, MdCommonModule],
    declarations: [MdBadgeComponent],
    exports: [MdBadgeComponent],
})
export class MdBadgeModule {}

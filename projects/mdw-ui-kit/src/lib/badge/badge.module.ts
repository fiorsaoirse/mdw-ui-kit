import { NgModule } from '@angular/core';
import { MdSharedModule } from '../shared/shared.module';
import { MdBadgeComponent } from './components/badge.component';

@NgModule({
    imports: [MdSharedModule],
    declarations: [
        MdBadgeComponent
    ]
})
export class MdBadgeModule {
    constructor() { }
}
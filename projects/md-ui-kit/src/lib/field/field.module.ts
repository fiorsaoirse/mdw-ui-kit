import { NgModule } from '@angular/core';
import { MdSharedModule } from '../shared';
import { MdFieldRangeComponent } from './field-range/components/field-range.component';
import { MdFieldComponent } from './field/components/field.component';
import { MdInputDirective } from './input/input.directive';

@NgModule({
    imports: [
        MdSharedModule
    ],
    declarations: [
        MdFieldComponent,
        MdFieldRangeComponent,
        MdInputDirective
    ],
    exports: [
        MdFieldComponent,
        MdFieldRangeComponent,
        MdInputDirective
    ]
})
export class MdFieldModule { }
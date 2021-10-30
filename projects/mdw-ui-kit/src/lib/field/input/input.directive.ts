import { Directive, Optional } from '@angular/core';
import { MdFieldRangeComponent } from '../field-range/components/field-range.component';
import { MdFieldComponent } from '../field/components/field.component';

@Directive({
    selector: 'input[mdInput]',
    exportAs: 'mdInputDir'
})
export class MdInputDirective {
    constructor(
        @Optional() private readonly field?: MdFieldComponent,
        @Optional() private readonly fieldRange?: MdFieldRangeComponent
    ) { }

    logParent(): void {
        console.log(this.field);
        console.log(this.fieldRange);
    }
}
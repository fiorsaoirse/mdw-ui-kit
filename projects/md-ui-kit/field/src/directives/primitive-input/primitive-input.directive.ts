import { Directive, ElementRef, forwardRef } from '@angular/core';
import { MdInput } from '../../contracts/basic-input';

@Directive({
    selector: 'input[mdPrimitiveInput]',
    providers: [
        {
            provide: MdInput,
            useExisting: forwardRef(() => MdPrimitiveInputDirective),
        },
    ],
})
export class MdPrimitiveInputDirective extends MdInput {
    constructor(readonly elementRef: ElementRef) {
        super();
    }
}

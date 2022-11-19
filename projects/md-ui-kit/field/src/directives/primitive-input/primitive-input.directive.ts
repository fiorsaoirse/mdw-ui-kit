import { Directive, forwardRef } from '@angular/core';
import { MdInput } from '../../contracts/basic-input';

@Directive({
    selector: 'mdPrimitiveInput',
    providers: [
        {
            provide: MdInput,
            useExisting: forwardRef(() => MdPrimitiveInputDirective),
        },
    ],
})
export class MdPrimitiveInputDirective<T = any> extends MdInput {
    constructor() {
        super();
    }
}

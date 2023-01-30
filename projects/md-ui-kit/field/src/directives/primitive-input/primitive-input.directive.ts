import { Directive, forwardRef } from '@angular/core';
import { MdInput } from '../../contracts/basic-input';
import { MD_INPUT_WATCHED_PROVIDER } from '../../contracts/basic-input-controller';

@Directive({
    selector: 'input[mdPrimitiveInput]',
    providers: [
        MD_INPUT_WATCHED_PROVIDER,
        {
            provide: MdInput,
            useExisting: forwardRef(() => MdPrimitiveInputDirective),
        },
    ],
})
export class MdPrimitiveInputDirective extends MdInput {
    constructor() {
        super();
    }
}

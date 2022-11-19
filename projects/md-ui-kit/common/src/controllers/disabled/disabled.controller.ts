import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import { MdBaseControllerDirective } from '../base/base.controller';

export const MD_DISABLED = new InjectionToken<MdDisabledControllerDirective>(
    'MdDisabledControllerDirective',
    {
        factory: () => {
            return new MdDisabledControllerDirective();
        },
    },
);

@Directive({
    selector: '[mdDisabled]',
    providers: [
        {
            provide: MD_DISABLED,
            useExisting: forwardRef(() => MdDisabledControllerDirective),
        },
    ],
})
export class MdDisabledControllerDirective extends MdBaseControllerDirective {
    @Input('mdDisabled') disabled: boolean;

    constructor() {
        super();
        this.disabled = false;
    }
}

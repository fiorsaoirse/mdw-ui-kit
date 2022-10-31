import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import { ControllerDirective } from '../controller';

export const MD_CLEARABLE = new InjectionToken<MdClearableControllerDirective>(
    `Token that creates the instance of mdClearable directive with default params
     if there is no directive was provided from upper components`,
    {
        factory: () => new MdClearableControllerDirective()
    }
);

@Directive({
    selector: '[mdClearable]',
    providers: [
        {
            provide: MD_CLEARABLE,
            useExisting: forwardRef(() => MdClearableControllerDirective),
        },
    ],
})
export class MdClearableControllerDirective extends ControllerDirective {
    @Input('mdClearable') clearable: boolean;

    constructor() {
        super();
        this.clearable = false;
    }
}
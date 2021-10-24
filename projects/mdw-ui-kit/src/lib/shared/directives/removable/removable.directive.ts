import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import { ControllerDirective } from '../controller';

export const MD_REMOVABLE = new InjectionToken<MdRemovableControllerDirective>(
    `Token that creates the instance of mdRemovable directive with default params
     if there is no directive was provided from upper components`,
    {
        factory: () => new MdRemovableControllerDirective()
    }
);

@Directive({
    selector: '[mdRemovable]',
    providers: [
        {
            provide: MD_REMOVABLE,
            useExisting: forwardRef(() => MdRemovableControllerDirective),
        },
    ],
})
export class MdRemovableControllerDirective extends ControllerDirective {
    @Input('mdRemovable') removable: boolean;

    constructor() {
        super();
        this.removable = false;
    }
}
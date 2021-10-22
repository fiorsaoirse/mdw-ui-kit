import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import { Controller } from '../controller';

export const MDW_REMOVABLE = new InjectionToken<MdwRemovableControllerDirective>(
    `Token that creates the instance of mdwRemovable directive with default params
     if there is no directive was provided from upper components`,
    {
        factory: () => {
            console.log('[mdwRemovable] inside the injection token factory');
            return new MdwRemovableControllerDirective();
        }
    }
)

@Directive({
    selector: '[mdwRemovable]',
    providers: [
        {
            provide: MDW_REMOVABLE,
            useExisting: forwardRef(() => MdwRemovableControllerDirective),
        },
    ],
})
export class MdwRemovableControllerDirective extends Controller {
    @Input('mdwRemovable') removable: boolean;

    constructor() {
        super();
        this.removable = false;
    }
}
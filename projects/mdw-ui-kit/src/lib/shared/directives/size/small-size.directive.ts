import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import { Controller } from '../controller';

export const MDW_SMALL = new InjectionToken<MdwSmallControllerDirective>(
    `Token that creates the instance of mdwSmall directive with default params
     if there is no directive was provided from upper components`,
    {
        factory: () => {
            console.log('[mdwSmall] inside the injection token factory');
            return new MdwSmallControllerDirective();
        }
    }
)

@Directive({
    selector: '[mdwSmall]',
    providers: [
        {
            provide: MDW_SMALL,
            useExisting: forwardRef(() => MdwSmallControllerDirective),
        },
    ],
})
export class MdwSmallControllerDirective extends Controller {
    @Input('mdwSmall') small: boolean;

    constructor() {
        super();
        this.small = false;
    }
}
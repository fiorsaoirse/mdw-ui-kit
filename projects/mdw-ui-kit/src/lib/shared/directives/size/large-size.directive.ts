import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import { Controller } from '../controller';

export const MDW_LARGE = new InjectionToken<MdwLargeControllerDirective>(
    `Token that creates the instance of mdwLarge directive with default params
     if there is no directive was provided from upper components`,
    {
        factory: () => {
            console.log('[mdwLarge] inside the injection token factory');
            return new MdwLargeControllerDirective();
        }
    }
)

@Directive({
    selector: '[mdwLarge]',
    providers: [
        {
            provide: MDW_LARGE,
            useExisting: forwardRef(() => MdwLargeControllerDirective),
        },
    ],
})
export class MdwLargeControllerDirective extends Controller {
    @Input('mdwLarge') large: boolean;

    constructor() {
        super();
        this.large = false;
    }
}
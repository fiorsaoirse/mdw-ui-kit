import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import { MdSize } from '../../contracts';
import { ControllerDirective } from '../controller';

// Если никто по DI не повесил директиву, то нам вернется директива с дефолтными значениями
export const MD_SIZE = new InjectionToken<MdSizeControllerDirective>(
    `Token that creates the instance of mdSize directive with default params
     if there is no directive was provided from upper components`,
    {
        factory: () => {
            console.log('in md size factory');
            return new MdSizeControllerDirective();
        }
    }
);

@Directive({
    selector: '[mdSize]',
    providers: [
        {
            provide: MD_SIZE,
            useExisting: forwardRef(() => MdSizeControllerDirective),
        },
    ],
})
export class MdSizeControllerDirective extends ControllerDirective {
    @Input('mdSize') size: MdSize;

    constructor() {
        super();
        this.size = MdSize.Medium;
    }
}
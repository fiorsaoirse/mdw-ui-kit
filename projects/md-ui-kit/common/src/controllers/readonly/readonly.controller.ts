import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import { MdBaseControllerDirective } from '../base/base.controller';

export const MD_READONLY = new InjectionToken<MdReadonlyControllerDirective>(
    'MdReadonlyControllerDirective',
    {
        factory: () => {
            return new MdReadonlyControllerDirective();
        },
    },
);

@Directive({
    selector: '[mdReadonly]',
    providers: [
        {
            provide: MD_READONLY,
            useExisting: forwardRef(() => MdReadonlyControllerDirective),
        },
    ],
})
export class MdReadonlyControllerDirective extends MdBaseControllerDirective {
    @Input('mdReadonly') readonly: boolean;

    constructor() {
        super();
        this.readonly = false;
    }
}

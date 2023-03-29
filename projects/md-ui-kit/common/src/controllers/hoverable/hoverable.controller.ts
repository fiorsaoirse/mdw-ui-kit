import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import { BooleanInput, coerceBooleanInput } from 'md-ui-kit/utils';
import { MdBaseControllerDirective } from '../base/base.controller';

export const MD_HOVERABLE = new InjectionToken<MdHoverableControllerDirective>(
    'MdHoverableControllerDirective',
    {
        factory: () => {
            console.log('factory');
            return new MdHoverableControllerDirective();
        },
    },
);

@Directive({
    selector: '[mdHoverable]',
    providers: [
        {
            provide: MD_HOVERABLE,
            useExisting: forwardRef(() => MdHoverableControllerDirective),
        },
    ],
})
export class MdHoverableControllerDirective extends MdBaseControllerDirective {
    private _hoverable: boolean;

    @Input('mdHoverable') public set hoverable(value: BooleanInput) {
        this._hoverable = coerceBooleanInput(value);
    }

    public get hoverable(): boolean {
        return this._hoverable;
    }

    constructor() {
        super();
        this._hoverable = false;
    }
}

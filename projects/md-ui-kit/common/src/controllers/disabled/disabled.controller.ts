import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import { BooleanInput, coerceBooleanInput } from 'md-ui-kit/utils';
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
    private _disabled: boolean;

    @Input('mdDisabled') public set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanInput(value);
    }

    public get disabled(): boolean {
        return this._disabled;
    }

    constructor() {
        super();
        this._disabled = false;
    }
}

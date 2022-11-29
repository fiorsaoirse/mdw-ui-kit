import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import { BooleanInput, coerceBooleanInput } from 'md-ui-kit/utils';
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
    private _readonly: boolean;

    @Input('mdReadonly') public set readonly(value: BooleanInput) {
        this._readonly = coerceBooleanInput(value);
    }

    public get readonly(): boolean {
        return this._readonly;
    }

    constructor() {
        super();
        this._readonly = false;
    }
}

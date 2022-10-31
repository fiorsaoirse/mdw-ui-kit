import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import {
    BooleanInput,
    coerceBooleanInput,
} from '@fiorsaoirse/mdw-ui-kit/utils';
import { MdBaseControllerDirective } from '../base/base';

/**
 * This token uses a factory to create the directive instance with default params
 * in case if there is no directive from upper DI Tree
 */
export const MD_REMOVABLE = new InjectionToken<MdRemovableControllerDirective>(
    'MdRemovableControllerDirective',
    {
        factory: () => new MdRemovableControllerDirective(),
    },
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
export class MdRemovableControllerDirective extends MdBaseControllerDirective {
    private _removable: boolean;

    @Input('mdRemovable') set removable(value: BooleanInput) {
        this._removable = coerceBooleanInput(value);
    }

    public get removable(): boolean {
        return this._removable;
    }

    constructor() {
        super();
        this._removable = false;
    }
}

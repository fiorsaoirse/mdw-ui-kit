import { Directive, forwardRef, InjectionToken, Input } from '@angular/core';
import { MdSize } from '@fiorsaoirse/mdw-ui-kit/common';
import { isString } from '@fiorsaoirse/mdw-ui-kit/utils';
import { MdBaseControllerDirective } from '../base/base';

/**
 * This token uses a factory to create the directive instance with default params
 * in case if there is no directive from upper DI Tree
 */
export const MD_SIZE = new InjectionToken<MdSizeControllerDirective>(
    'MdSizeControllerDirective',
    {
        factory: () => {
            return new MdSizeControllerDirective();
        },
    },
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
export class MdSizeControllerDirective extends MdBaseControllerDirective {
    private _size: MdSize;

    @Input('mdSize') set size(value: 'small' | 'medium' | 'large' | MdSize) {
        if (isString(value)) {
            switch (value) {
                case 'small': {
                    this._size = MdSize.Small;
                    break;
                }
                case 'medium': {
                    this._size = MdSize.Medium;
                    break;
                }
                case 'large': {
                    this._size = MdSize.Large;
                    break;
                }
                default:
                    return;
            }
        }

        this._size = value;
    }

    get size(): MdSize {
        return this._size;
    }

    constructor() {
        super();
        this.size = MdSize.Medium;
    }
}

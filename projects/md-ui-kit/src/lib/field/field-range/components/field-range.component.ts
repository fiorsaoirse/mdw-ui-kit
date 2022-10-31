import { Component, ElementRef, HostBinding, Inject, Input, Renderer2 } from '@angular/core';
import { MdSize } from '../../../shared';
import { isString } from '../../../utils';
import { BaseField } from '../../base-field';
import { MdFieldRangeWatchedController, MD_FIELD_RANGE_WATCHED_CONTROLLER, MD_FIELD_RANGE_WATCHED_PROVIDER } from '../field-range.controller';

@Component({
    selector: 'md-field-range',
    templateUrl: './field-range.component.html',
    providers: [
        MD_FIELD_RANGE_WATCHED_PROVIDER,
        { provide: BaseField, useExisting: MdFieldRangeComponent }
    ]
})
export class MdFieldRangeComponent extends BaseField {
    private _label?: string;

    @Input() set label(value: string) {
        if (isString(value)) {
            this._label = value;
        }
    }

    get label(): string {
        return this._label ?? '';
    }

    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
        @Inject(MD_FIELD_RANGE_WATCHED_CONTROLLER) private readonly controller: MdFieldRangeWatchedController
    ) {
        super();
    }

    @HostBinding('class.md-large')
    get large(): boolean {
        return this.controller.isLarge;
    }

    @HostBinding('class.md-small')
    get small(): boolean {
        return this.controller.isSmall;
    }

    @HostBinding('class.md-disabled')
    get disabled(): boolean {
        return this.controller.disabled;
    }

    get size(): MdSize {
        return this.controller.size;
    }
}
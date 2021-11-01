import {
    Component, ElementRef, EventEmitter,
    HostBinding, Inject, Input, Output, Renderer2
} from '@angular/core';
import { MdSize } from '../../../shared';
import { isString } from '../../../utils';
import { BaseField } from '../../base-field';
import {
    MdFieldWatchedController, MD_FIELD_WATCHED_CONTROLLER,
    MD_FIELD_WATCHED_PROVIDER
} from '../field.controller';

@Component({
    selector: 'md-field',
    templateUrl: './field.component.html',
    providers: [
        MD_FIELD_WATCHED_PROVIDER,
        /**
         * Providing itself as base class component for usage
         * in child controls elemens - either as straigforward child component or
         * as projected component
         */
        { provide: BaseField, useExisting: MdFieldComponent }
    ]
})
export class MdFieldComponent extends BaseField {

    private _label?: string;

    @Input() set label(value: string) {
        if (isString(value)) {
            this._label = value;
        }
    }

    get label(): string {
        return this._label ?? '';
    }

    @Output() readonly clean: EventEmitter<void>;

    constructor(
        private readonly renderer: Renderer2,
        private readonly elementRef: ElementRef,
        @Inject(MD_FIELD_WATCHED_CONTROLLER) private readonly controller: MdFieldWatchedController
    ) {
        super();
        this.renderer.addClass(this.elementRef.nativeElement, 'md-field');
        this.clean = new EventEmitter();
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
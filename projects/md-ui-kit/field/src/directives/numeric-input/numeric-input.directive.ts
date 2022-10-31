import {
    Directive,
    ElementRef,
    forwardRef,
    HostListener,
    Input,
    Provider,
    Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EMPTY_FUNCTION } from 'md-ui-kit/common';
import { coerceNumericInput, isNil, isString } from 'md-ui-kit/utils';
import { NAVIGATION_KEYS } from '../../constants/navigation-keys';
import { NUMBER_KEYS } from '../../constants/number-keys';

const MINUS = '-';

const MD_NUMERIC_INPUT_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdNumericInputDirective),
    multi: true,
};

@Directive({
    selector: 'input[mdNumericInput]',
    providers: [MD_NUMERIC_INPUT_VALUE_ACCESSOR],
})
export class MdNumericInputDirective implements ControlValueAccessor {
    private _value: string | number | null;

    set value(x: string | number | null) {
        if (isNil(x)) {
            this._value = null;
        } else if (isString(x)) {
            this._value = this.mode === 'number' ? coerceNumericInput(x) : x;
        } else {
            this._value = this.mode === 'string' ? x.toString() : x;
        }

        this.onChange(this.value);
    }

    get value(): string | number | null {
        return this._value;
    }

    @Input() readonly mode: 'string' | 'number';
    @Input() readonly allowNegative: boolean;

    onChange: (_: any) => void;
    onTouched: () => void;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
    ) {
        this._value = null;
        this.mode = 'string';
        this.allowNegative = true;

        this.onChange = EMPTY_FUNCTION;
        this.onTouched = EMPTY_FUNCTION;
    }

    writeValue(value: string | number): void {
        this.value = value;
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.renderer.setProperty(
            this.elementRef.nativeElement,
            'disabled',
            isDisabled,
        );
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent): void {
        if (NAVIGATION_KEYS.includes(event.key)) {
            return;
        }

        if (
            this.negativeNumberNotAllowed(event.key) ||
            !NUMBER_KEYS.includes(event.key)
        ) {
            event.preventDefault();
            return;
        }
    }

    private negativeNumberNotAllowed(key: string): boolean {
        if (!this.allowNegative) {
            return false;
        }

        if (key === MINUS && !!this.elementRef.nativeElement.value) {
            return true;
        }

        return false;
    }
}

import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    forwardRef,
    Input,
    Provider,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EMPTY_FUNCTION } from 'md-ui-kit/common';
import { MdInput } from '../../contracts/basic-input';

const TEXT_FIELD_PROVIDER: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdTextFieldComponent),
    multi: true,
};

const HOST_CLASS = 'md-text-field';

@Component({
    selector: 'md-text-field',
    templateUrl: './text-field.component.html',
    providers: [TEXT_FIELD_PROVIDER],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdTextFieldComponent
    implements ControlValueAccessor, AfterViewInit
{
    @Input() label = '';

    @ViewChild(MdInput) private readonly input?: MdInput;
    @ViewChild('input', { read: ElementRef })
    private readonly inputDomElement?: ElementRef<HTMLInputElement>;

    value: string | null;

    onChange: (_: any) => void;
    onTouched: () => void;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
    ) {
        this.value = null;

        this.onChange = EMPTY_FUNCTION;
        this.onTouched = EMPTY_FUNCTION;
    }

    ngAfterViewInit(): void {
        this.renderer.addClass(this.elementRef.nativeElement, HOST_CLASS);
    }

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    inputChange(event): void {
        console.log(event);
    }

    focusOnInput(): void {
        this.inputDomElement?.nativeElement.focus();
    }
}

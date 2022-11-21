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
import { EMPTY_FUNCTION, MdOnDestroy } from 'md-ui-kit/common';
import { MdSize } from 'md-ui-kit/contracts';
import { MdInput } from '../../contracts/basic-input';
import { MD_INPUT_WATCHED_PROVIDER } from '../../contracts/basic-input-controller';

const TEXT_FIELD_PROVIDER: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdTextFieldComponent),
    multi: true,
};

const HOST_CLASS = 'md-text-field';

@Component({
    selector: 'md-text-field',
    templateUrl: './text-field.component.html',
    providers: [TEXT_FIELD_PROVIDER, MD_INPUT_WATCHED_PROVIDER, MdOnDestroy],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdTextFieldComponent
    implements ControlValueAccessor, AfterViewInit
{
    @Input() label = '';

    @Input() isLabelOutside = false;

    @ViewChild(MdInput) private readonly input?: MdInput;
    @ViewChild('input', { read: ElementRef })
    private readonly inputDomElement?: ElementRef<HTMLInputElement>;

    value: string | null;

    onChange: (_: any) => void;
    onTouched: () => void;

    get isLabelRaisable(): boolean {
        return !!(
            !this.isLabelOutside &&
            this.input?.size &&
            this.input?.size !== MdSize.Small
        );
    }

    get isLabelRaised(): boolean {
        return this.isLabelRaisable && !!this.value;
    }

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

        this.input?.fieldStateChanged.subscribe((state) => {
            console.log('state ', state);
        });
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

    inputChange(value: string): void {
        this.onChange(value);
    }

    focusOnInput(): void {
        if (this.input?.isDisabled || this.input?.isReadonly) {
            return;
        }

        this.inputDomElement?.nativeElement.focus();
    }
}

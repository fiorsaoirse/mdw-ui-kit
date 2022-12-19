import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostBinding,
    Input,
    Provider,
    QueryList,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
    EMPTY_FUNCTION,
    EMPTY_QUERY,
    MdContentOutletComponent,
    MdOnDestroy,
    MdSize,
} from 'md-ui-kit/common';
import { isNil } from 'md-ui-kit/utils';
import { MD_INPUT_WATCHED_PROVIDER } from '../../contracts/basic-input-controller';
import { MdFieldState } from '../../contracts/field-state';
import { MdInput } from '../../public-api';

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

    @ViewChild(MdInput)
    private readonly input?: MdInput;

    @ContentChildren(MdContentOutletComponent, { descendants: true })
    readonly content?: QueryList<unknown> = EMPTY_QUERY;

    value: string | null;

    onChange: (_: any) => void;
    onTouched: () => void;

    public isInputFocused: boolean;
    public isInputHidden: boolean;

    get isLabelRaisable(): boolean {
        return !!(
            !this.isLabelOutside &&
            this.input?.size &&
            this.input?.size !== MdSize.Small
        );
    }

    get isLabelRaised(): boolean {
        return (
            this.isLabelRaisable && (this.isInputFocused || !isNil(this.value))
        );
    }

    get isOutside(): boolean {
        return this.isLabelOutside || this.input?.size === MdSize.Small;
    }

    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
    ) {
        this.value = null;
        this.isInputFocused = false;
        this.isInputHidden = false;

        this.onChange = EMPTY_FUNCTION;
        this.onTouched = EMPTY_FUNCTION;
    }

    @HostBinding('class')
    private get classes() {
        return {
            [`${HOST_CLASS}-${this.input?.size}`]: true,
            [`${HOST_CLASS}-disabled`]: this.input?.isDisabled,
            [`${HOST_CLASS}-readonly`]: this.input?.isReadonly,
        };
    }

    ngAfterViewInit(): void {
        this.renderer.addClass(this.elementRef.nativeElement, HOST_CLASS);

        this.input?.fieldStateChanged.subscribe((state) => {
            this.isInputFocused = state === MdFieldState.Focused;
            this.checkInputVisibility();
        });
    }

    writeValue(value: string | null): void {
        this.value = value;
        this.checkInputVisibility();
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

        this.input?.elementRef?.nativeElement.focus();
    }

    private checkInputVisibility(): void {
        this.isInputHidden = !!this.content?.length && !isNil(this.value);
    }
}

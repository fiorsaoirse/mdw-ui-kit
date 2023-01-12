import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostBinding,
    Inject,
    Input,
    Optional,
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
    MD_CLOSE_ICON_URL,
} from 'md-ui-kit/common';
import { isNil } from 'md-ui-kit/utils';
import { Observable, ReplaySubject } from 'rxjs';
import { MdFieldState } from '../../contracts/field-state';
import { MdInput } from '../../public-api';
import {
    MdTextFieldWatchedController,
    MD_TEXTFIELD_WATCHED_CONTROLLER,
    MD_TEXTFIELD_WATCHED_PROVIDER,
} from './text-field.controller';

const TEXT_FIELD_PROVIDER: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MdTextFieldComponent),
    multi: true,
};

const HOST_CLASS = 'md-text-field';

@Component({
    selector: 'md-text-field',
    templateUrl: './text-field.component.html',
    providers: [
        TEXT_FIELD_PROVIDER,
        MD_TEXTFIELD_WATCHED_PROVIDER,
        MdOnDestroy,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdTextFieldComponent
    implements ControlValueAccessor, AfterViewInit
{
    @Input() label = '';
    @Input() isLabelOutside = false;

    /**
     * TODO: add ability to set input from outside as content
     */
    @ViewChild(MdInput)
    private readonly input?: MdInput;

    @ContentChildren(MdContentOutletComponent, { descendants: true })
    readonly content?: QueryList<unknown> = EMPTY_QUERY;

    value: string | null;

    onChange: (_: any) => void;
    onTouched: () => void;

    public isInputFocused: boolean;

    private readonly fieldState$$: ReplaySubject<MdFieldState>;
    public readonly fieldState$: Observable<MdFieldState>;

    get isLabelRaisable(): boolean {
        return !!(
            !this.isLabelOutside &&
            this.controller?.size &&
            this.controller?.size !== MdSize.Small
        );
    }

    get isLabelRaised(): boolean {
        return this.isLabelRaisable && (this.isInputFocused || !!this.value);
    }

    get isOutside(): boolean {
        return this.isLabelOutside || this.controller?.size === MdSize.Small;
    }

    get isInputHidden(): boolean {
        return (
            !this.isInputFocused && !!this.content?.length && !isNil(this.value)
        );
    }

    get nativeFocusableElement(): HTMLInputElement | null {
        if (!this.input) {
            return null;
        }

        const { nativeElement } = this.input.elementRef;

        return nativeElement as HTMLInputElement | null;
    }

    get hasClearButton(): boolean {
        return (
            !(this.controller.isDisabled || this.controller.isReadonly) &&
            this.controller.removable
        );
    }

    get size(): MdSize {
        return this.controller.size;
    }

    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
        @Inject(MD_TEXTFIELD_WATCHED_CONTROLLER)
        private readonly controller: MdTextFieldWatchedController,
        @Optional()
        @Inject(MD_CLOSE_ICON_URL)
        readonly closeIconUrl?: string,
    ) {
        this.value = null;
        this.isInputFocused = false;

        this.onChange = EMPTY_FUNCTION;
        this.onTouched = EMPTY_FUNCTION;

        this.fieldState$$ = new ReplaySubject(1);
        this.fieldState$ = this.fieldState$$.asObservable();
    }

    @HostBinding('class')
    private get classes() {
        return {
            [`${HOST_CLASS}-${this.controller.size}`]: true,
            [`${HOST_CLASS}-disabled`]: this.controller.isDisabled,
            [`${HOST_CLASS}-readonly`]: this.controller.isReadonly,
        };
    }

    ngAfterViewInit(): void {
        this.renderer.addClass(this.elementRef.nativeElement, HOST_CLASS);

        this.input?.fieldState$.subscribe((state) => {
            this.isInputFocused = state === MdFieldState.Focused;

            this.fieldState$$.next(state);
        });
    }

    writeValue(value: string | null): void {
        this.value = value;
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    inputChange(value: string): void {
        this.updateValue(value);
    }

    focusOnInput(): void {
        if (this.input?.isDisabled || this.input?.isReadonly) {
            return;
        }

        this.isInputFocused = true;

        this.input?.elementRef?.nativeElement.focus();
    }

    clear(event: MouseEvent): void {
        if (!this.value) {
            return;
        }

        this.updateValue(null);

        event.preventDefault();
        event.stopPropagation();
    }

    private updateValue(value: string | null): void {
        this.value = value;
        this.onChange(value);

        if (this.nativeFocusableElement) {
            this.nativeFocusableElement.value = value ?? '';
        }
    }
}

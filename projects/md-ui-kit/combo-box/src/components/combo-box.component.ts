import { DOCUMENT } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Inject,
    Input,
    NgZone,
    Output,
    Provider,
    QueryList,
    Self,
    ViewChild,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR,
    Validators,
} from '@angular/forms';
import {
    EMPTY_FUNCTION,
    EMPTY_QUERY,
    MdContent,
    MdOnDestroy,
    MD_DEBOUNCE_TIME,
} from 'md-ui-kit/common';
import { MdFieldState, MdTextFieldComponent } from 'md-ui-kit/field';
import { isNil } from 'md-ui-kit/utils';
import { BehaviorSubject, defer, fromEvent, merge, Observable } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    first,
    startWith,
    switchMap,
    takeUntil,
} from 'rxjs/operators';
import {
    MdComboBoxWatchedController,
    MD_COMBO_BOX_WATCHED_CONTROLLER,
    MD_COMBO_BOX_WATCHED_PROVIDER,
} from '../combo-box.controller';
import { MD_MIN_COMBO_BOX_SEARCH_LENGTH } from '../tokens/tokens';
import { MdComboBoxOptionComponent } from './combo-box-option/combo-box-option.component';
import { MdComboBoxContext, MdSelectionEvent } from './combo-box.contract';
export { MD_DEBOUNCE_TIME } from 'md-ui-kit/common';

const defaultStringifyHandler = (item: unknown): string | null => {
    return item ? String(item) : null;
};

const MD_COMBO_BOX_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => MdComboBoxComponent),
};

@Component({
    selector: 'md-combo-box',
    templateUrl: './combo-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        MdOnDestroy,
        MD_COMBO_BOX_WATCHED_PROVIDER,
        MD_COMBO_BOX_VALUE_ACCESSOR,
    ],
    host: {
        class: 'md-combo-box',
    },
})
export class MdComboBoxComponent<T, R = any>
    implements AfterViewInit, AfterContentInit, ControlValueAccessor
{
    @Input() label: string;
    @Input() stringify: (item: T | null) => string | null =
        defaultStringifyHandler;
    @Input() content: MdContent = ({ $implicit }) => String($implicit);

    @ViewChild(MdTextFieldComponent)
    private readonly textField?: MdTextFieldComponent;

    @ContentChildren(MdComboBoxOptionComponent<T, R>)
    options: QueryList<MdComboBoxOptionComponent<T, R>> = EMPTY_QUERY;

    @Output() selectionChange: EventEmitter<MdSelectionEvent<T, R>>;
    @Output() searchInputChange: EventEmitter<string | null>;

    private value: T | null;
    private selectedItem?: R;

    private open$$: BehaviorSubject<boolean>;
    private isFocused: boolean;

    public open$: Observable<boolean>;

    public showContent: boolean;
    public formGroup: FormGroup<{ inputControl: FormControl<string | null> }>;

    onChange: (_: any) => void = EMPTY_FUNCTION;
    onTouched: () => void = EMPTY_FUNCTION;

    constructor(
        private readonly ngZone: NgZone,
        private readonly changeDetectorRef: ChangeDetectorRef,
        private readonly elementRef: ElementRef,
        @Self() private readonly destroy$: MdOnDestroy,
        @Inject(DOCUMENT) private readonly document: Document,
        @Inject(MD_COMBO_BOX_WATCHED_CONTROLLER)
        private readonly watchedController: MdComboBoxWatchedController,
        @Inject(MD_DEBOUNCE_TIME) private readonly debounce: number,
        @Inject(MD_MIN_COMBO_BOX_SEARCH_LENGTH)
        private readonly minSearchLength: number,
    ) {
        this.selectionChange = new EventEmitter();
        this.searchInputChange = new EventEmitter();

        this.value = null;
        this.label = '';

        this.showContent = false;

        this.open$$ = new BehaviorSubject(false);
        this.open$ = this.open$$.asObservable();

        this.isFocused = false;

        const initialValue = this.stringify(this.value);

        this.formGroup = new FormGroup({
            inputControl: new FormControl(initialValue, {
                validators: [Validators.minLength(this.minSearchLength)],
            }),
        });
    }

    get open(): boolean {
        return this.open$$.value;
    }

    get context(): MdComboBoxContext<T, R> | null {
        if (!this.value) {
            return null;
        }

        return new MdComboBoxContext(this.value, this.selectedItem);
    }

    public writeValue(value: T): void {
        this.value = value;
        this.showContent = !isNil(this.value);

        this.formGroup.patchValue({
            inputControl: this.stringify(this.value),
        });
    }

    public registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public ngAfterViewInit(): void {
        const control = this.formGroup.get('inputControl');
        control?.valueChanges
            .pipe(
                debounceTime(this.debounce),
                distinctUntilChanged(),
                filter(
                    (value: string | null) =>
                        !this.watchedController.disabled &&
                        !this.watchedController.readonly &&
                        (!value || this.formGroup.valid),
                ),
                takeUntil(this.destroy$),
            )
            .subscribe((searchInputValue: string | null) => {
                if (!searchInputValue) {
                    this.clear();
                }

                this.searchInputChange.emit(searchInputValue);
            });

        this.textField?.fieldState$
            .pipe(takeUntil(this.destroy$))
            .subscribe((state) => {
                this.isFocused = state === MdFieldState.Focused;
            });

        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.document, 'click')
                .pipe(
                    filter((event) => {
                        const target = event.target as HTMLElement;

                        return !(
                            this.elementRef.nativeElement as HTMLElement
                        ).contains(target);
                    }),
                    takeUntil(this.destroy$),
                )
                .subscribe(() => {
                    this.ngZone.run(() => {
                        this.closeDropdown();
                    });
                });
        });
    }

    @HostListener('keydown.esc', ['$event'])
    onKeyDownEsc(event: Event): void {
        this.closeDropdown();
    }

    public ngAfterContentInit(): void {
        this.options.changes
            .pipe(startWith(this.options), takeUntil(this.destroy$))
            .subscribe(() => {
                // After options initializing we have to observe the stream of option selection events
                this.trackCurrentOptionsSelections();

                const next = this.isFocused && !!this.options.length;
                this.open$$.next(next);

                this.changeDetectorRef.markForCheck();
            });
    }

    public toggle(): void {
        const current = this.open$$.getValue();
        const next = !!this.options.length && !current;
        this.open$$.next(next);
    }

    private clear(): void {
        this.value = null;
        this.selectedItem = undefined;

        this.showContent = false;
        this.formGroup.reset();

        this.onChange(this.value);
        this.closeDropdown();
    }

    /**
     * Stream with currently selected option
     */
    private optionsSelectionChanges: Observable<MdSelectionEvent<T, R>> = defer(
        () => {
            const options = this.options;

            if (options.length) {
                return merge(
                    ...options.map((option) => option.selected.asObservable()),
                );
            }

            /*
        On the other hand, we have to wait when the zone is stable - there is no more
        scheduled microtasks, all potential data is loaded, all sync or async functions executed
        and call this method again to get the stream of option selection events
        */
            return this.ngZone.onStable.asObservable().pipe(
                switchMap(() => this.optionsSelectionChanges),
                first(),
            );
        },
    );

    /**
     * Takes the lazy stream of option selection events
     */
    private trackCurrentOptionsSelections(): void {
        const triggers = merge(this.options.changes, this.destroy$);

        this.optionsSelectionChanges
            .pipe(takeUntil(triggers))
            .subscribe((event) => {
                this.value = event.value;
                this.selectedItem = event.item;

                this.showContent = !isNil(event.value);

                this.formGroup.patchValue({
                    inputControl: this.stringify(this.value),
                });

                this.closeDropdown();
                this.onChange(event.value);

                this.selectionChange.emit(event);
                this.changeDetectorRef.detectChanges();
            });
    }

    private closeDropdown(): void {
        if (!this.open) {
            return;
        }

        this.open$$.next(false);
    }
}

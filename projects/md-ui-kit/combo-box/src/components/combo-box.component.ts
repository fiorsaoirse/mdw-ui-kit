import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    forwardRef,
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
import { MdTextFieldComponent } from 'md-ui-kit/field';
import { isNil } from 'md-ui-kit/utils';
import { MdFieldState } from 'projects/md-ui-kit/field/src/contracts/field-state';
import { defer, merge, Observable } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    first,
    startWith,
    switchMap,
    takeUntil,
    tap,
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

enum SearchStates {
    NONE = 'none',
    SEARCHING = 'searching',
    SHOWING = 'showing',
}

const defaultStringifyHandler = (item: unknown): string | null => {
    console.log('default ', item);
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
export class MdComboBoxComponent<T, R>
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

    private state: SearchStates;

    private value: T | null;
    private selectedItem?: R;

    public showContent: boolean;
    public formGroup: FormGroup<{ inputControl: FormControl<string | null> }>;

    onChange: (_: any) => void = EMPTY_FUNCTION;
    onTouched: () => void = EMPTY_FUNCTION;

    constructor(
        private readonly ngZone: NgZone,
        private readonly changeDetectorRef: ChangeDetectorRef,
        @Self() private readonly destroy$: MdOnDestroy,
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

        this.state = SearchStates.NONE;

        const initialValue = this.stringify(this.value);

        this.formGroup = new FormGroup({
            inputControl: new FormControl(initialValue, {
                validators: [Validators.minLength(this.minSearchLength)],
            }),
        });
    }

    get context(): MdComboBoxContext<T, R> | null {
        if (!this.value) {
            return null;
        }

        return new MdComboBoxContext(this.value, this.selectedItem);
    }

    writeValue(value: T): void {
        this.value = value;
        this.showContent = !isNil(this.value);
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
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
                this.searchInputChange.emit(searchInputValue);
            });

        this.textField?.fieldState$
            .pipe(takeUntil(this.destroy$))
            .subscribe((state: MdFieldState) => {
                console.log(state);

                this.showContent = state !== MdFieldState.Focused;

                console.log(this.value);

                if (isNil(this.value)) {
                    console.log('show list or reset');

                    if (state === MdFieldState.Focused) {
                        this.state = SearchStates.SHOWING;
                    } else {
                        this.state = SearchStates.NONE;
                    }
                }
            });
    }

    public ngAfterContentInit(): void {
        this.options.changes
            .pipe(
                startWith(this.options),
                tap((changes: QueryList<MdComboBoxOptionComponent<T, R>>) => {
                    this.state =
                        changes.length && this.formGroup.touched
                            ? SearchStates.SHOWING
                            : SearchStates.NONE;
                }),
                takeUntil(this.destroy$),
            )
            .subscribe(() => {
                // After options initializing we have to observe the stream of option selection events
                this.trackCurrentOptionsSelections();
                this.changeDetectorRef.markForCheck();
            });
    }

    public clearInput(): void {
        this.showContent = false;
        this.state = SearchStates.NONE;
        this.searchInputChange.emit(null);
    }

    public get isInFillingState(): boolean {
        return this.state === SearchStates.NONE;
    }

    public get isInSearchingState(): boolean {
        return this.state === SearchStates.SEARCHING;
    }

    public get isInShowingState(): boolean {
        return this.state === SearchStates.SHOWING;
    }

    /**
     * Stream with currently selected option
     */
    private optionsSelectionChanges: Observable<MdSelectionEvent<T, R>> = defer(
        () => {
            const options = this.options;

            if (options) {
                return merge(
                    ...options.map((option) => option.selected.asObservable()),
                ).pipe(first());
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

                this.state = SearchStates.NONE;

                this.onChange(event.value);

                this.selectionChange.emit(event);
                this.changeDetectorRef.detectChanges();
            });
    }
}

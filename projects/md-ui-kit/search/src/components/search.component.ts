import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    Inject,
    Input,
    NgZone,
    Output,
    QueryList,
    Self,
} from '@angular/core';
import { ControlValueAccessor, FormControl, Validators } from '@angular/forms';
import {
    EMPTY_FUNCTION,
    EMPTY_QUERY,
    MdDisabledControllerDirective,
    MdOnDestroy,
    MD_DISABLED,
} from 'md-ui-kit/common';
import { MD_DEBOUNCE_TIME } from 'md-ui-kit/contracts';
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
import { MD_MIN_SEARCH_LENGTH } from '../tokens/tokens';
import { MdSearchOptionComponent } from './search-option/search-option.component';
import { MdSelectionEvent } from './search.contract';
export { MD_DEBOUNCE_TIME } from 'md-ui-kit/contracts';

enum SearchStates {
    FILLING = 'filling',
    SEARCHING = 'searching',
    SHOWING = 'showing',
}

const defaultStringifyHandler = (item: unknown): string => {
    return String(item) ?? '';
};

@Component({
    selector: 'md-search',
    templateUrl: './search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MdOnDestroy],
})
export class MdSearchComponent<T, R>
    implements AfterViewInit, AfterContentInit, ControlValueAccessor
{
    @Input() stringify: (item: R) => string = defaultStringifyHandler;

    @ContentChildren(MdSearchOptionComponent<T, R>)
    options: QueryList<MdSearchOptionComponent<T, R>> = EMPTY_QUERY;

    @Output() selectedOption: EventEmitter<MdSelectionEvent<T, R>>;
    @Output() searchInputChange: EventEmitter<string | null>;

    private state: SearchStates;

    private value: number | null;
    public viewValue: string;

    public inputControl: FormControl<string>;

    onChange: (_: any) => void = EMPTY_FUNCTION;
    onTouched: () => void = EMPTY_FUNCTION;

    constructor(
        private readonly ngZone: NgZone,
        private readonly changeDetectorRef: ChangeDetectorRef,
        @Self() private readonly destroy$: MdOnDestroy,
        @Inject(MD_DISABLED)
        private readonly disabledController: MdDisabledControllerDirective,
        @Inject(MD_DEBOUNCE_TIME) private readonly debounce: number,
        @Inject(MD_MIN_SEARCH_LENGTH) private readonly minSearchLength: number,
    ) {
        this.selectedOption = new EventEmitter();
        this.searchInputChange = new EventEmitter();

        this.value = null;
        this.viewValue = '';

        this.state = SearchStates.FILLING;

        this.inputControl = new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.minLength(this.minSearchLength)],
        });
    }

    writeValue(value: number): void {
        this.value = value;
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public ngAfterViewInit(): void {
        this.inputControl.valueChanges
            .pipe(
                startWith(this.viewValue),
                debounceTime(this.debounce),
                distinctUntilChanged(),
                filter(
                    () =>
                        !this.disabledController.disabled &&
                        this.inputControl.valid,
                ),
                takeUntil(this.destroy$),
            )
            .subscribe((searchInputValue: string) => {
                this.searchInputChange.emit(searchInputValue);
            });
    }

    public ngAfterContentInit(): void {
        this.options.changes
            .pipe(
                startWith(this.options),
                tap((changes: QueryList<MdSearchOptionComponent<T, R>>) => {
                    if (changes.length) {
                        // this.state =
                    }
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
        this.state = SearchStates.FILLING;
        this.searchInputChange.emit(null);
    }

    public get isInFillingState(): boolean {
        return this.state === SearchStates.FILLING;
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
                this.onChange(event.value);
                this.viewValue =
                    (event.item
                        ? this.stringify(event.item)
                        : event.value?.toString()) ?? '';

                this.inputControl.setValue('');

                // this.state = SearchStates.FILLING;

                this.selectedOption.emit(event);

                this.changeDetectorRef.markForCheck();
            });
    }
}

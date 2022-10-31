import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    Inject,
    NgZone,
    Output,
    QueryList,
    Self,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import {
    EMPTY_FUNCTION,
    EMPTY_QUERY,
    MdOnDestroy,
    MD_DEBOUNCE_TIME,
} from 'md-ui-kit/common';
import { defer, fromEvent, merge, Observable } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    first,
    map,
    startWith,
    switchMap,
    takeUntil,
    tap,
} from 'rxjs/operators';
import { MD_MIN_SEARCH_LENGTH } from '../tokens/tokens';
import { MdSearchOptionComponent } from './search-option/search-option.component';
import { ISearchOption } from './search.contract';

enum SearchStates {
    FILLING = 'filling',
    SEARCHING = 'searching',
    SHOWING = 'showing',
}

@Component({
    selector: 'md-search',
    templateUrl: './search.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [MdOnDestroy],
})
export class MdSearchComponent
    implements AfterViewInit, AfterContentInit, ControlValueAccessor
{
    @ContentChildren(MdSearchOptionComponent)
    options: QueryList<MdSearchOptionComponent> = EMPTY_QUERY;

    @Output() selectionChange: EventEmitter<ISelectedSearchItemEvent>;
    @Output() searchInputChange: EventEmitter<string | null>;

    private state: SearchStates;
    private _value: number;

    onChange: (_: any) => void = EMPTY_FUNCTION;
    onTouched: () => void = EMPTY_FUNCTION;

    constructor(
        private readonly ngZone: NgZone,
        private readonly changeDetectorRef: ChangeDetectorRef,
        @Self() private readonly destroy$: MdOnDestroy,
        @Inject(MD_DEBOUNCE_TIME) private readonly debounce: number,
        @Inject(MD_MIN_SEARCH_LENGTH) private readonly minSearchLength: number,
    ) {
        this.selectionChange = new EventEmitter<ISelectedSearchItemEvent>();
        this.searchInputChange = new EventEmitter<string | null>();

        this.state = SearchStates.FILLING;
    }

    writeValue(value: number): void {
        this._value = value;
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public ngAfterViewInit(): void {
        fromEvent(this.searchInput.nativeElement, 'input')
            .pipe(
                debounceTime(this.debounce),
                distinctUntilChanged(),
                map((event: Event) => {
                    const target = event.target as HTMLInputElement;
                    return target.value.trim();
                }),
                filter((value: string) => value.length > this.minSearchLength),
                takeUntil(this.destroy$),
            )
            .subscribe((value: string) => {
                this.searchInputChange.emit(value);
            });
    }

    public ngAfterContentInit(): void {
        /**
         * There we subscribe on options count changes
         * Example: we made http request, got an array of options and set them inside
         * so the count of options changed
         */
        this.options.changes
            .pipe(
                startWith(this.options),
                tap((changes: QueryList<ISearchOption>) => {
                    const results = changes.toArray();
                    if (results.length) {
                        this.state = SearchStates.SHOWING;
                    }
                }),
                takeUntil(this.destroy$),
            )
            .subscribe((_changes: QueryList<ISearchOption>) => {
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
     * There we define the factory of lazy Observable for current options selection event
     */
    private optionsSelectionChanges: Observable<ISelectedSearchItemEvent> =
        defer(() => {
            const options = this.options;

            // In case, when options have been initialized yet (for the first set, f.e.),
            // we have to return the Observable of option selection events
            if (options) {
                const optionEmittersObservable = options.map(
                    (
                        option: MdSearchOptionComponent,
                    ): Observable<ISelectedSearchItemEvent> =>
                        option.selectEmitter.asObservable(),
                );

                return merge(...optionEmittersObservable);
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
        });

    /**
     * This method takes the lazy Observble with stream of option selection events
     * and subscribes on this stream to
     */
    private trackCurrentOptionsSelections(): void {
        // Define trigger events when current tracking is useless - if the count of options has been changed
        // or the component has been destroyed we have to kill this subscription and get a new one
        const triggers = merge(this.options.changes, this.destroy$);

        // When we select option, the search state have to change after emitting selected value
        this.optionsSelectionChanges
            .pipe(takeUntil(triggers))
            .subscribe((selectionEvent: ISelectedSearchItemEvent): void => {
                this.selectedItemChange.emit(selectionEvent);
                this.searchInput.nativeElement.value = '';
                this.state = SearchStates.FILLING;
                this.changeDetectorRef.markForCheck();
            });
    }
}

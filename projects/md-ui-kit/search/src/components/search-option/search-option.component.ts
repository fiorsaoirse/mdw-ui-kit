import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Input
} from '@angular/core';
import { isNumber, isString } from 'md-ui-kit/contracts';
import {
    ISearchOption,
    ISelectedSearchItemEvent,
    SearchOptionContent,
    SearchOptionType
} from '../search.contract';

@Component({
    selector: 'md-search-option',
    templateUrl: './search-option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdSearchOptionComponent<T extends ISearchOption = ISearchOption> {
    @Input() content: SearchOptionContent;
    @Input() item: R;

    get type(): SearchOptionType {
        if (isNumber(this.content) || isString(this.content)) {
            return 'primitive';
        }

        if (this.content instanceof ComponentContent)
    }

    public readonly selectEmitter: EventEmitter<ISelectedSearchItemEvent<R>>;

    constructor() {
        this.selectEmitter = new EventEmitter();
    }

    @HostListener('click')
    private onClick(): void {
        this.selectEmitter.emit({ item: this.item });
    }
}

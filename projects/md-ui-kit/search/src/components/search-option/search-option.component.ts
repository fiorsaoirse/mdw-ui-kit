import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
} from '@angular/core';
import { MdContent, MdContext } from 'md-ui-kit/contracts';
import { MdSearchContext, MdSelectionEvent } from '../search.contract';

@Component({
    selector: 'md-search-option',
    templateUrl: './search-option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdSearchOptionComponent<T = any, R = any> {
    @Input() readonly value: T | null = null;
    @Input() readonly item?: R;

    @Input() content: MdContent = ({ $implicit }: MdSearchContext<T, R>) =>
        String($implicit);

    @Output() readonly selected: EventEmitter<MdSelectionEvent<T, R>>;

    constructor() {
        this.selected = new EventEmitter();
    }

    @HostListener('click')
    private onClick(): void {
        this.selected.emit(new MdSelectionEvent(this.value, this.item));
    }

    get context(): MdContext<MdSearchContext<T, R>> {
        return new MdContext<MdSearchContext<T, R>>({
            $implicit: this.value,
            item: this.item,
        });
    }
}

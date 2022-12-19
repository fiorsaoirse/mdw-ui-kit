import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
} from '@angular/core';
import { MdContent } from 'md-ui-kit/common';
import { MdComboBoxContext, MdSelectionEvent } from '../combo-box.contract';

@Component({
    selector: 'md-combo-box-option',
    templateUrl: './combo-box-option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdComboBoxOptionComponent<T = any, R = any> {
    @Input() value!: T;
    @Input() item?: R;
    @Input() content: MdContent = ({ $implicit }: MdComboBoxContext<T, R>) =>
        String($implicit);

    @Output() readonly selected: EventEmitter<MdSelectionEvent<T, R>>;

    constructor() {
        this.selected = new EventEmitter();
    }

    @HostListener('click')
    private onClick(): void {
        this.selected.emit(new MdSelectionEvent(this.value, this.item));
    }

    get context(): MdComboBoxContext<T, R> {
        return new MdComboBoxContext<T, R>(this.value, this.item);
    }
}

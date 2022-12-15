import { MdContext } from 'md-ui-kit/common';

export interface IMdComboBoxImplicitContext<T, R> {
    $implicit: T;
    selectedItem?: R;
}

export class MdSelectionEvent<T, R> {
    constructor(readonly value: T | null, readonly item?: R) {}
}

export class MdComboBoxContext<T, R> extends MdContext {
    constructor(readonly $implicit: T, readonly selectedItem?: R) {
        super($implicit);
    }

    get polymorpheusOutlet(): IMdComboBoxImplicitContext<T, R> {
        return {
            $implicit: this.$implicit,
            selectedItem: this.selectedItem,
        };
    }
}

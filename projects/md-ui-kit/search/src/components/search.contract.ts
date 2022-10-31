export class MdSelectionEvent<T, R> {
    constructor(readonly value: T | null, readonly item?: R) {}
}

export interface MdSearchContext<T, R> {
    $implicit: T | null;
    item?: R;
}

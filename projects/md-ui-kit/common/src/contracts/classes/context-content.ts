export interface IMdImplicitContext<T> {
    $implicit: T;
}

// Context is a current concrete item as $implicit
export class MdContext<T = any> {
    constructor(readonly $implicit: T) {}

    get polymorpheusOutlet(): IMdImplicitContext<T> {
        return { $implicit: this.$implicit };
    }
}

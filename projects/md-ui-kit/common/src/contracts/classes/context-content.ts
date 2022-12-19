export interface IMdImplicitContext<T> {
    $implicit: T;
}

export class MdContext<T = any> {
    constructor(readonly $implicit: T) {}

    get polymorpheusOutlet(): IMdImplicitContext<T> {
        return { $implicit: this.$implicit };
    }
}

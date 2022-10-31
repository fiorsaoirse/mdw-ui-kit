export class MdContext<T = any> {
    constructor(readonly $implicit: T) {}

    get polymorpheusOutlet(): T {
        return this.$implicit;
    }
}

import { Injector, Type } from '@angular/core';
import { MD_CONTEXT } from '../../tokens/context';

export class MdComponentContent<T> {
    constructor(
        readonly component: Type<T>,
        private readonly injector: Injector | null = null,
    ) {}

    createInjectorWithContext<C>(context?: C, injector?: Injector): Injector {
        return Injector.create({
            parent: this.injector || injector,
            providers: [
                {
                    provide: MD_CONTEXT,
                    useValue: context,
                },
            ],
        });
    }
}

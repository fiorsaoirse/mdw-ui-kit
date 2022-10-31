import { IIdentifiable } from 'md-ui-kit/contracts';

export interface ISearchOption<T> extends Readonly<IIdentifiable> {
    content: T;
}

export interface ISelectedSearchOptionEvent<T = ISearchOption> {
    readonly value: number;
    readonly item?: T;
}

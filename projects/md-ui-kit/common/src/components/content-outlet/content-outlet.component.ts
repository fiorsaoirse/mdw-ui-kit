import {
    ChangeDetectionStrategy,
    Component,
    Input,
    TemplateRef,
} from '@angular/core';
import {
    MdComponentContent,
    MdContent,
    MdContentHandler,
    MdContext,
    MdPrimitive,
} from 'md-ui-kit/common';
import { isNil, isNumber, isString } from 'md-ui-kit/utils';

// TODO: maybe it could be better to implement this as directive

@Component({
    selector: 'md-content-outlet',
    templateUrl: './content-outlet.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdContentOutletComponent<T> {
    @Input() content: MdContent<T>;
    @Input() context: MdContext<T> | null;

    constructor() {
        this.content = null;
        this.context = null;
    }

    isPrimitive<T>(value: unknown): value is MdPrimitive {
        return isString(value) || isNumber(value) || isNil(value);
    }

    isFunction<T>(value: unknown): value is MdContentHandler<T> {
        return !isNil(value) && typeof value === 'function';
    }

    isTemplate<T>(value: unknown): value is TemplateRef<T> {
        return !isNil(value) && value instanceof TemplateRef;
    }

    isComponent<T>(value: unknown): value is MdComponentContent<T> {
        return !isNil(value) && value instanceof MdComponentContent;
    }
}

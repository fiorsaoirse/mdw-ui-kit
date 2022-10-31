import {
    ChangeDetectionStrategy,
    Component,
    Injector,
    Input,
    TemplateRef,
} from '@angular/core';
import {
    MdComponentContent,
    MdContent,
    MdContentHandler,
    MdContentType,
    MdContext,
    MdPrimitive,
} from 'md-ui-kit/contracts';
import { isNumber, isString } from 'md-ui-kit/utils';

@Component({
    selector: '[content-outlet]',
    templateUrl: './content-outlet.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdContentOutletComponent {
    @Input() content: MdContent;
    @Input() context: MdContext | null;

    constructor(readonly injector: Injector) {
        this.content = null;
        this.context = null;
    }

    get type(): MdContentType {
        if (this.content instanceof MdComponentContent) {
            return 'component';
        }

        if (this.content instanceof TemplateRef) {
            return 'template';
        }

        if (isFunction(this.content)) {
            return 'function';
        }

        if (isNumber(this.content) || isString(this.content)) {
            return 'primitive';
        }

        throw new Error('Unknown type of content!');
    }

    public applyContent(): MdPrimitive | never {
        if (isFunction(this.content)) {
            return this.content(this.context);
        }

        throw new Error('Content is not a callable!');
    }
}

function isFunction<T>(value: unknown): value is MdContentHandler<T> {
    return typeof value === 'function';
}

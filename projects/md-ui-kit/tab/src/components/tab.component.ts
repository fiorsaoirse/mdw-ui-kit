import { Directive, Inject, Input, TemplateRef } from '@angular/core';

import {
    MdContent,
    MdContext,
    MdDisabledControllerDirective,
    MD_DISABLED,
} from 'md-ui-kit/common';

@Directive({
    selector: 'md-tab:not(ng-container):not(ng-template)',
    host: {
        class: 'md-tab',
    },
})
export class MdTabDirective<T = any> {
    @Input() headerContent: MdContent = ({ $implicit }) => String($implicit);
    @Input() headerContext: MdContext | null = null;

    constructor(
        public readonly templateRef: TemplateRef<T>,
        @Inject(MD_DISABLED)
        private readonly disabledDirective: MdDisabledControllerDirective,
    ) {}

    get disabled(): boolean {
        return this.disabledDirective.disabled;
    }
}

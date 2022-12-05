import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Input,
} from '@angular/core';

import {
    MdContent,
    MdContext,
    MdDisabledControllerDirective,
    MD_DISABLED,
} from 'md-ui-kit/common';

@Component({
    selector: 'md-tab',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'md-tab',
    },
    template: '<ng-content></ng-content>',
})
export class MdTabComponent {
    @Input() headerContent: MdContent = ({ $implicit }) => String($implicit);
    @Input() headerContext: MdContext | null = null;

    constructor(
        @Inject(MD_DISABLED)
        private readonly disabledDirective: MdDisabledControllerDirective,
    ) {}

    get disabled(): boolean {
        return this.disabledDirective.disabled;
    }
}

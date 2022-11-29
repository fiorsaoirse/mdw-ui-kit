import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    Optional,
    Output,
} from '@angular/core';
import {
    MdAccordionWatchedController,
    MD_ACCORDION_WATCHED_CONTROLLER,
    MD_ACCORDION_WATCHED_PROVIDER,
} from '../accordion.controller';

import { BrowserModule } from '@angular/platform-browser';
import {
    MdCommonModule,
    MdContent,
    MdContext,
    MdOnDestroy,
} from 'md-ui-kit/common';
import { MD_ARROW_ICON_URL } from 'projects/md-ui-kit/common/src/tokens/icons';
import { MdSvgComponent } from 'projects/md-ui-kit/svg/src';
import { IMdAccordionState } from '../contracts/accordion';

const ACCORDION_CLASS = 'md-accordion';

@Component({
    selector: 'md-accordion',
    templateUrl: './accordion.component.html',
    providers: [MD_ACCORDION_WATCHED_PROVIDER, MdOnDestroy],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [BrowserModule, MdCommonModule, MdSvgComponent],
    standalone: true,
})
export class MdAccordionComponent {
    @Input() headerContent?: MdContent;
    @Input() headerContext?: MdContext | null = null;

    @Input() bodyContent: MdContent;
    @Input() bodyContext: MdContext | null = null;

    @Output() public readonly stateChanged: EventEmitter<IMdAccordionState>;

    open: boolean;

    constructor(
        @Inject(MD_ACCORDION_WATCHED_CONTROLLER)
        private readonly controller: MdAccordionWatchedController,
        @Optional()
        @Inject(MD_ARROW_ICON_URL)
        readonly arrowIconUrl?: string,
    ) {
        this.stateChanged = new EventEmitter();
        this.open = false;
    }

    @HostBinding('class')
    private get classes() {
        return {
            [ACCORDION_CLASS]: true,
            [`md-accordion-${this.controller.size}`]: true,
            'md-accordion-disabled': this.disabled,
        };
    }

    public get size(): string {
        return this.controller.size;
    }

    public get disabled(): boolean {
        return this.controller.disabled;
    }

    public onStateChanged(): void {
        this.open = !this.open;
        this.stateChanged.emit({ open: this.open, source: this });
    }
}

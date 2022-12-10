import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
} from '@angular/core';

import { EMPTY_QUERY, MdContext } from 'md-ui-kit/common';
import { MdTabDirective } from './tab.component';

@Component({
    selector: 'md-tabs',
    templateUrl: './tabs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'md-tabs',
    },
})
export class MdTabsComponent implements AfterViewInit {
    @ContentChildren(MdTabDirective) readonly tabs: QueryList<MdTabDirective> =
        EMPTY_QUERY;

    @Input() activeTab: MdTabDirective | null = null;

    @Output() activeTabChange = new EventEmitter<MdTabDirective>();

    constructor() {
        this.activeTabChange = new EventEmitter();
    }

    public ngAfterViewInit(): void {
        if (this.tabs.length && !this.activeTab) {
            this.activeTab = this.tabs.first;
        }
    }

    public isActive(tab: MdTabDirective): boolean {
        return this.activeTab === tab;
    }

    public getContext(tab: MdTabDirective): MdContext {
        return new MdContext(tab);
    }

    public onTabClicked(tab: MdTabDirective): void {
        this.activeTab = tab;
        this.activeTabChange.emit(tab);
    }
}

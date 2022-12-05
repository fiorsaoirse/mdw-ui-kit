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

import { BrowserModule } from '@angular/platform-browser';
import { EMPTY_QUERY, MdCommonModule } from 'md-ui-kit/common';
import { MdTabComponent } from './tab.component';

@Component({
    selector: 'md-tabs',
    templateUrl: './tabs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [BrowserModule, MdCommonModule],
    standalone: true,
    host: {
        class: 'md-tabs',
    },
})
export class MdTabsComponent<T> implements AfterViewInit {
    @ContentChildren(MdTabComponent) readonly tabs: QueryList<MdTabComponent> =
        EMPTY_QUERY;

    @Input() activeTab: MdTabComponent | null = null;

    @Output() activeTabChange = new EventEmitter<MdTabComponent>();

    constructor() {
        this.activeTabChange = new EventEmitter();
    }

    public ngAfterViewInit(): void {}

    public getContext(tab: MdTabComponent) {}

    public onTabClicked(tab: MdTabComponent): void {
        this.activeTab = tab;
        this.activeTabChange.emit(tab);
    }
}

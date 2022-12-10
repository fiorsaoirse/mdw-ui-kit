import { NgModule } from '@angular/core';
import { MdCommonModule } from 'md-ui-kit/common';
import { MdTabDirective } from './components/tab.component';
import { MdTabsComponent } from './components/tabs.component';

@NgModule({
    imports: [MdCommonModule],
    declarations: [MdTabsComponent, MdTabDirective],
    exports: [MdTabsComponent, MdTabDirective],
})
export class MdTabsModule {}

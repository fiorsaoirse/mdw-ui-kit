import { NgModule } from '@angular/core';
import { MdCommonModule } from 'md-ui-kit/common';
import { MdTabComponent } from './components/tab.component';
import { MdTabsComponent } from './components/tabs.component';

@NgModule({
    imports: [MdCommonModule],
    declarations: [MdTabsComponent, MdTabComponent],
    exports: [MdTabsComponent, MdTabComponent],
})
export class MdTabsModule {}

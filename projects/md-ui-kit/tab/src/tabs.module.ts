import { NgModule } from '@angular/core';
import { MdCommonModule } from 'md-ui-kit/common';
import { MdTabsComponent } from './components/tabs.component';
import { MdTabDirective } from './directives/tab.directive';

@NgModule({
    imports: [MdCommonModule],
    declarations: [MdTabsComponent, MdTabDirective],
    exports: [MdTabsComponent, MdTabDirective],
})
export class MdTabsModule {}

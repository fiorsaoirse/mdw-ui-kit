import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdCommonModule } from 'md-ui-kit/common';
import { MdTabsComponent } from './components/tabs.component';
import { MdTabDirective } from './directives/tab.directive';

@NgModule({
    imports: [MdCommonModule, FormsModule],
    declarations: [MdTabsComponent, MdTabDirective],
    exports: [MdTabsComponent, MdTabDirective],
})
export class MdTabsModule {}

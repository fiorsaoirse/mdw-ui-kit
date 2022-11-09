import { NgModule } from '@angular/core';
import { MdCommonModule } from 'md-ui-kit/common';
import { MdCardComponent } from './components/card.component';

@NgModule({
    imports: [MdCommonModule],
    declarations: [MdCardComponent],
    exports: [MdCardComponent],
})
export class MdCardModule {}

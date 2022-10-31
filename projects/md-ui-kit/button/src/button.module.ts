import { NgModule } from '@angular/core';
import { MdCommonModule } from 'md-ui-kit/common';
import { MdButtonComponent } from './components/button.component';

@NgModule({
    imports: [MdCommonModule],
    declarations: [MdButtonComponent],
    exports: [MdButtonComponent],
})
export class MdButtonModule {}

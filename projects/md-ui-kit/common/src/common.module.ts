import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdContentOutletComponent } from './components/content-outlet/content-outlet.component';
import { MdDisabledControllerDirective } from './controllers/disabled/disabled';
import { MdRemovableControllerDirective } from './controllers/removable/removable';
import { MdSizeControllerDirective } from './controllers/size/size';

@NgModule({
    imports: [CommonModule],
    declarations: [
        MdContentOutletComponent,
        MdRemovableControllerDirective,
        MdSizeControllerDirective,
        MdDisabledControllerDirective,
    ],
    exports: [
        MdRemovableControllerDirective,
        MdSizeControllerDirective,
        MdDisabledControllerDirective,
    ],
})
export class MdCommonModule {}

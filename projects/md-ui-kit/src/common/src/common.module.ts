import { NgModule } from '@angular/core';
import { MdDisabledControllerDirective } from './controllers/disabled/disabled';
import { MdRemovableControllerDirective } from './controllers/removable/removable';
import { MdSizeControllerDirective } from './controllers/size/size';

@NgModule({
    declarations: [
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

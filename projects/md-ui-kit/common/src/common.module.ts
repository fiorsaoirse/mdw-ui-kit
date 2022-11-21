import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdContentOutletComponent } from './components/content-outlet/content-outlet.component';
import { MdDisabledControllerDirective } from './controllers/disabled/disabled.controller';
import { MdReadonlyControllerDirective } from './controllers/readonly/readonly.controller';
import { MdRemovableControllerDirective } from './controllers/removable/removable.controller';
import { MdSizeControllerDirective } from './controllers/size/size.controller';

@NgModule({
    imports: [CommonModule],
    declarations: [
        MdContentOutletComponent,
        MdRemovableControllerDirective,
        MdSizeControllerDirective,
        MdDisabledControllerDirective,
        MdReadonlyControllerDirective,
    ],
    exports: [
        MdContentOutletComponent,
        MdRemovableControllerDirective,
        MdSizeControllerDirective,
        MdDisabledControllerDirective,
        MdReadonlyControllerDirective,
        CommonModule,
    ],
})
export class MdCommonModule {}

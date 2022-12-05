import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdContentOutletComponent } from './components/content-outlet/content-outlet.component';
import { MdDisabledControllerDirective } from './controllers/disabled/disabled.controller';
import { MdReadonlyControllerDirective } from './controllers/readonly/readonly.controller';
import { MdRemovableControllerDirective } from './controllers/removable/removable.controller';
import { MdSizeControllerDirective } from './controllers/size/size.controller';
import { MdGuardPipe } from './pipes/guard-pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [
        MdContentOutletComponent,
        MdRemovableControllerDirective,
        MdSizeControllerDirective,
        MdDisabledControllerDirective,
        MdReadonlyControllerDirective,
        MdGuardPipe,
    ],
    exports: [
        MdContentOutletComponent,
        MdRemovableControllerDirective,
        MdSizeControllerDirective,
        MdDisabledControllerDirective,
        MdReadonlyControllerDirective,
        MdGuardPipe,
        CommonModule,
    ],
})
export class MdCommonModule {}

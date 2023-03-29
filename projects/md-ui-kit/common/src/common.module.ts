import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdContentOutletComponent } from './components/content-outlet/content-outlet.component';
import { MdDisabledControllerDirective } from './controllers/disabled/disabled.controller';
import { MdHoverableControllerDirective } from './controllers/hoverable/hoverable.controller';
import { MdReadonlyControllerDirective } from './controllers/readonly/readonly.controller';
import { MdRemovableControllerDirective } from './controllers/removable/removable.controller';
import { MdSizeControllerDirective } from './controllers/size/size.controller';
import { MdGuardPipe } from './pipes/guard-pipe';

const DECLARATIONS = [
    MdContentOutletComponent,
    MdRemovableControllerDirective,
    MdSizeControllerDirective,
    MdDisabledControllerDirective,
    MdReadonlyControllerDirective,
    MdHoverableControllerDirective,
    MdGuardPipe,
];

@NgModule({
    imports: [CommonModule, BrowserModule],
    declarations: DECLARATIONS,
    exports: [...DECLARATIONS, CommonModule, BrowserModule],
})
export class MdCommonModule {}

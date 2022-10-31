import { NgModule } from '@angular/core';
import { MdClearableControllerDirective } from './directives/clearable/clearable.directive';
import { MdDisabledControllerDirective } from './directives/disabled/disabled.directive';
import { MdSizeControllerDirective } from './directives/size/size.directive';

@NgModule({
  declarations: [
    MdClearableControllerDirective,
    MdSizeControllerDirective,
    MdDisabledControllerDirective,
  ],
  exports: [
    MdClearableControllerDirective,
    MdSizeControllerDirective,
    MdDisabledControllerDirective,
  ],
})
export class MdCommonModule {
  constructor() {}
}

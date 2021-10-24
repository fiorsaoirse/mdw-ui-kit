import { NgModule } from '@angular/core';
import { MdButtonDirective } from './button.directive';

@NgModule({
    declarations: [MdButtonDirective],
    exports: [MdButtonDirective]
})
export class MdButtonModule { }
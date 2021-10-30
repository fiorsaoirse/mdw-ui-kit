import { NgModule } from '@angular/core';
import { MdButtonDirective } from './components/button.directive';

@NgModule({
    declarations: [MdButtonDirective],
    exports: [MdButtonDirective]
})
export class MdButtonModule { }
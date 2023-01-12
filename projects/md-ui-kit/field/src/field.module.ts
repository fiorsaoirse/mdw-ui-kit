import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdCommonModule } from 'md-ui-kit/common';
import { MdSvgComponent } from 'projects/md-ui-kit/svg/src';
import { MdTextFieldComponent } from './components/text-field/text-field.component';
import { MdNumericInputDirective } from './directives/numeric-input/numeric-input.directive';
import { MdPrimitiveInputDirective } from './directives/primitive-input/primitive-input.directive';

@NgModule({
    imports: [CommonModule, FormsModule, MdCommonModule, MdSvgComponent],
    declarations: [
        MdPrimitiveInputDirective,
        MdNumericInputDirective,
        MdTextFieldComponent,
    ],
    exports: [
        MdPrimitiveInputDirective,
        MdNumericInputDirective,
        MdTextFieldComponent,
        FormsModule,
        MdCommonModule,
    ],
})
export class MdFieldModule {}

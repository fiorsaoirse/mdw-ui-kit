import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdCommonModule } from 'md-ui-kit/common';
import { MdFieldModule } from 'md-ui-kit/field';
import { MdComboBoxOptionComponent } from './components/combo-box-option/combo-box-option.component';
import { MdComboBoxComponent } from './components/combo-box.component';

@NgModule({
    imports: [ReactiveFormsModule, MdCommonModule, MdFieldModule],
    declarations: [MdComboBoxOptionComponent, MdComboBoxComponent],
    exports: [MdComboBoxOptionComponent, MdComboBoxComponent],
})
export class MdComboBoxModule {}

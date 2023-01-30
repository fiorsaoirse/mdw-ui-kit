import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdCommonModule } from 'md-ui-kit/common';
import { MdFieldModule } from 'md-ui-kit/field';
import { MdComboBoxOptionComponent } from './components/combo-box-option/combo-box-option.component';
import { MdComboBoxComponent } from './components/combo-box.component';

@NgModule({
    imports: [ReactiveFormsModule, MdCommonModule, MdFieldModule, FormsModule],
    declarations: [MdComboBoxOptionComponent, MdComboBoxComponent],
    exports: [
        MdComboBoxOptionComponent,
        MdComboBoxComponent,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class MdComboBoxModule {}

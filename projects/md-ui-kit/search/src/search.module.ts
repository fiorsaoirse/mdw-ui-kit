import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdCommonModule } from 'md-ui-kit/common';
import { MdSearchOptionComponent } from './components/search-option/search-option.component';
import { MdSearchComponent } from './components/search.component';

@NgModule({
    imports: [ReactiveFormsModule, MdCommonModule],
    declarations: [MdSearchOptionComponent, MdSearchComponent],
    exports: [],
})
export class MdSearchModule {}

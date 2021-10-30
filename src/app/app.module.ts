import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { BadgeTestComponent } from './badge/badge.component';
import { ButtonTestComponent } from './button/button.component';
import { FieldTestComponent } from './field/field.component';
// TODO: наконфижить импорты (alias)
import { MdBadgeModule } from '../../projects/mdw-ui-kit/src/lib/badge';
import { MdSharedModule } from '../../projects/mdw-ui-kit/src/lib/shared';
import { MdButtonModule } from '../../projects/mdw-ui-kit/src/lib/button';
import { MdFieldModule } from '../../projects/mdw-ui-kit/src/lib/field/field.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        BadgeTestComponent,
        ButtonTestComponent,
        FieldTestComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        RouterModule.forRoot(routes),
        MdSharedModule,
        MdBadgeModule,
        MdButtonModule,
        MdFieldModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
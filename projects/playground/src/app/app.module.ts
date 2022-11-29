import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MdAccordionComponent } from 'md-ui-kit/accordion';
import { MdBadgeComponent } from 'md-ui-kit/badge';
import { MdButtonComponent } from 'md-ui-kit/button';
import { MdCardComponent } from 'md-ui-kit/card';
import {
    MdCommonModule,
    MD_ARROW_ICON_URL,
    MD_CLOSE_ICON_URL,
} from 'md-ui-kit/common';
import { MdFieldModule } from 'md-ui-kit/field';
import { AccordionTestComponent } from './accordion/accordion.component';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { BadgeTestComponent } from './badge/badge.component';
import { ButtonTestComponent } from './button/button.component';
import { CardTestComponent } from './card/card.component';
import { FieldTestComponent } from './field/field-test.component';

@NgModule({
    declarations: [
        AppComponent,
        AccordionTestComponent,
        BadgeTestComponent,
        ButtonTestComponent,
        CardTestComponent,
        FieldTestComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes),
        MdCommonModule,
        MdBadgeComponent,
        MdButtonComponent,
        MdCardComponent,
        MdAccordionComponent,
        MdFieldModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: MD_CLOSE_ICON_URL,
            useValue: '/assets/icons/close.svg',
        },
        {
            provide: MD_ARROW_ICON_URL,
            useValue: '/assets/icons/chevron.svg',
        },
    ],
})
export class AppModule {}

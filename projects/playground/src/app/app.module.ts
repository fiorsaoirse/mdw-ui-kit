import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MdBadgeModule } from 'md-ui-kit/badge';
import { MdButtonModule } from 'md-ui-kit/button';
import { MdCardModule } from 'md-ui-kit/card';
import { MdCommonModule } from 'md-ui-kit/common';
import { MdFieldModule } from 'md-ui-kit/field';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { BadgeTestComponent } from './badge/badge.component';
import { ButtonTestComponent } from './button/button.component';
import { CardTestComponent } from './card/card.component';
import { FieldTestComponent } from './field/field-test.component';

@NgModule({
    declarations: [
        AppComponent,
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
        MdBadgeModule,
        MdButtonModule,
        MdCardModule,
        MdFieldModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

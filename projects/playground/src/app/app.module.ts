import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MdBadgeModule } from 'md-ui-kit/badge';
import { MdButtonModule } from 'md-ui-kit/button';
import { MdCommonModule } from 'md-ui-kit/common';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { BadgeTestComponent } from './badge/badge.component';
import { ButtonTestComponent } from './button/button.component';

@NgModule({
    declarations: [AppComponent, BadgeTestComponent, ButtonTestComponent],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        RouterModule.forRoot(routes),
        MdCommonModule,
        MdBadgeModule,
        MdButtonModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

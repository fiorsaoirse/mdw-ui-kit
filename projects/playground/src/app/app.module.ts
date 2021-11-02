import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { BadgeTestComponent } from './badge/badge.component';
import { ButtonTestComponent } from './button/button.component';
import { FieldTestComponent } from './field/field.component';
import { MdBadgeModule, MdButtonModule, MdFieldModule, MdSharedModule } from 'mdw-ui-kit';

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
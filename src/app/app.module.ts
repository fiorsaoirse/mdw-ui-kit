import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { BadgeTestComponent } from './badge/badge.component';
import { ButtonTestComponent } from './button/button.component';
// TODO: проверить импорты
import { MdBadgeModule } from '../../projects/mdw-ui-kit/src/lib/badge';
import { MdSharedModule } from '../../projects/mdw-ui-kit/src/lib/shared';
import { MdButtonModule } from '../../projects/mdw-ui-kit/src/lib/button';


@NgModule({
    declarations: [
        AppComponent,
        BadgeTestComponent,
        ButtonTestComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule.forRoot(routes),
        MdSharedModule,
        MdBadgeModule,
        MdButtonModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
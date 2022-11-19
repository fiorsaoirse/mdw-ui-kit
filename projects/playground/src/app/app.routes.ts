import { Routes } from '@angular/router';
import { BadgeTestComponent } from './badge/badge.component';
import { ButtonTestComponent } from './button/button.component';
import { CardTestComponent } from './card/card.component';
import { FieldTestComponent } from './field/field-test.component';

export const routes: Routes = [
    {
        path: 'badge',
        component: BadgeTestComponent,
    },
    {
        path: 'button',
        component: ButtonTestComponent,
    },
    {
        path: 'card',
        component: CardTestComponent,
    },
    {
        path: 'field',
        component: FieldTestComponent,
    },
];

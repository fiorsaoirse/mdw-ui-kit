import { Routes } from '@angular/router';
import { AccordionTestComponent } from './accordion/accordion.component';
import { BadgeTestComponent } from './badge/badge.component';
import { ButtonTestComponent } from './button/button.component';
import { CardTestComponent } from './card/card.component';
import { FieldTestComponent } from './field/field-test.component';

export const routes: Routes = [
    {
        path: 'accordion',
        component: AccordionTestComponent,
    },
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

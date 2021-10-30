import { Routes } from '@angular/router';
import { BadgeTestComponent } from './badge/badge.component';
import { ButtonTestComponent } from './button/button.component';
import { FieldTestComponent } from './field/field.component';

export const routes: Routes = [
    {
        path: 'badge',
        component: BadgeTestComponent
    },
    {
        path: 'button',
        component: ButtonTestComponent
    },
    {
        path: 'field',
        component: FieldTestComponent
    }
];
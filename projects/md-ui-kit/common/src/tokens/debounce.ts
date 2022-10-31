import { InjectionToken } from '@angular/core';

export const MD_DEBOUNCE_TIME = new InjectionToken<number>(
    'Debounce time for input elements, in ms',
    {
        factory: () => 500,
    },
);

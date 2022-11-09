import { InjectionToken } from '@angular/core';

export const MD_MIN_SEARCH_LENGTH = new InjectionToken<number>(
    'Minimal count of symbols to trigger search',
    {
        factory: () => 3,
    },
);

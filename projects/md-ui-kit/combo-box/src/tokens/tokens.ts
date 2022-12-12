import { InjectionToken } from '@angular/core';

export const MD_MIN_COMBO_BOX_SEARCH_LENGTH = new InjectionToken<number>(
    'Minimal count of symbols to trigger search inside the combo-box',
    {
        factory: () => 3,
    },
);

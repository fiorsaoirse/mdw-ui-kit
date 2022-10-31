import { InjectionToken } from '@angular/core';
import { MdContext } from 'md-ui-kit/contracts';

export const MD_CONTEXT = new InjectionToken<MdContext>(
    'Context for outlet with a component',
);

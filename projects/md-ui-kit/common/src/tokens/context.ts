import { InjectionToken } from '@angular/core';
import { MdContext } from '../contracts/classes/context-content';

export const MD_CONTEXT = new InjectionToken<MdContext>(
    'Context for outlet with a component',
);

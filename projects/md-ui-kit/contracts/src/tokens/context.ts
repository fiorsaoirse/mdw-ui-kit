import { InjectionToken } from '@angular/core';
import { MdContext } from '../common/classes/context-content';

export const MD_CONTEXT = new InjectionToken<MdContext>(
    'Context for outlet with a component',
);

import { ElementRef } from '@angular/core';

export interface IMdLazyObservedParams {
    root?: ElementRef;
    rootMargin?: string | number;
    threshold?: number | number[];
}

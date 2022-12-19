import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';
import { isNumber } from 'md-ui-kit/utils';
import { IMdLazyObservedParams } from '../contracts/lazy-observed';

@Directive({
    selector: '[mdLazyObserved]',
    standalone: true,
})
export class MdLazyObservedDirective implements AfterViewInit, OnDestroy {
    private observer: IntersectionObserver | null;

    @Input() options?: IMdLazyObservedParams;
    @Input() observeOnce?: boolean;

    @Output() reached: EventEmitter<void>;

    constructor(private readonly observedElementRef: ElementRef) {
        this.observer = null;
        this.observeOnce = true;
        this.reached = new EventEmitter();
    }

    ngAfterViewInit(): void {
        let rootMargin;

        if (this.options?.rootMargin) {
            if (isNumber(this.options.rootMargin)) {
                rootMargin = `${this.options.rootMargin}px`;
            } else {
                rootMargin = this.options.rootMargin;
            }
        }

        const options: IntersectionObserverInit = {
            root: this.options?.root?.nativeElement,
            threshold: this.options?.threshold ?? 0.5,
            rootMargin,
        };

        this.observer = new IntersectionObserver(
            (
                entries: IntersectionObserverEntry[],
                observer: IntersectionObserver,
            ) => {
                const [entry] = entries;

                if (entry.isIntersecting) {
                    this.reached.emit();

                    if (this.observeOnce) {
                        observer.unobserve(
                            this.observedElementRef.nativeElement,
                        );
                    }
                }
            },
            options,
        );

        this.observer.observe(this.observedElementRef.nativeElement);
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}

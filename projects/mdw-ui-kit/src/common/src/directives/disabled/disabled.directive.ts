import { Directive, ElementRef, forwardRef, inject, InjectionToken, Input, Renderer2 } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { MdOnDestroy } from '../../services';
import { ControllerDirective } from '../controller';

// Если никто по DI не повесил директиву, то нам вернется директива с дефолтными значениями
export const MD_DISABLED = new InjectionToken<MdDisabledControllerDirective>(
    `Token that creates the instance of mdDisabled directive with default params
     if there is no directive was provided from upper components`,
    {
        factory: () => {
            // const elementRef = inject(ElementRef);
            const mdOnDestroy = inject(MdOnDestroy);

            return new MdDisabledControllerDirective(mdOnDestroy);
        }
    }
);

const CSS_CLASSNAME = 'md-disabled';

@Directive({
    selector: '[mdDisabled]',
    // Если же директива "повешена" выше, по токену вернется этот же инстанс
    providers: [
        {
            provide: MD_DISABLED,
            useExisting: forwardRef(() => MdDisabledControllerDirective),
        },
    ]
})
export class MdDisabledControllerDirective extends ControllerDirective {
    @Input('mdDisabled') disabled: boolean;

    // private readonly renderer: Renderer2;

    constructor(
        // private readonly elementRef: ElementRef,
        private readonly destroy$: MdOnDestroy
    ) {
        super();

        //  this.renderer = inject(Renderer2);

        this.disabled = false;

        console.log(this);

        // this.changes$.pipe(
        //     tap(() => {
        //         console.log('disabled directive changed, new value:', this.disabled)
        //     }),
        //     // takeUntil(this.destroy$)
        // ).subscribe(() => {
        //     // TODO: проверять чейнджи?
        //     // console.log('changes');
        //     this.setCssClass();
        // });
    }

    // private setCssClass(): void {
    //     if (this.disabled) {
    //         this.renderer.addClass(this.elementRef.nativeElement, CSS_CLASSNAME);
    //     } else {
    //         this.renderer.removeClass(this.elementRef.nativeElement, CSS_CLASSNAME);
    //     }
    // }
}
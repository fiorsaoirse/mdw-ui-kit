import { Directive, ElementRef, forwardRef, inject, InjectionToken, Input, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { MdOnDestroy } from '../../services';
import { ControllerDirective } from '../controller';

// Если никто по DI не повесил директиву, то нам вернется директива с дефолтными значениями
export const MD_DISABLED = new InjectionToken<MdDisabledControllerDirective>(
    `Token that creates the instance of mdDisabled directive with default params
     if there is no directive was provided from upper components`,
    {
        factory: () => {
            return new MdDisabledControllerDirective();
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

    constructor(

    ) {
        super();
        this.disabled = false;

        this.changes$.subscribe(() => {
            console.log('disabled directive changed, new value:', this.disabled)
        });

        // this.changes$.pipe(
        //     takeUntil(this.destroy$)
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
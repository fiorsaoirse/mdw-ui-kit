import {
    Directive,
    ElementRef,
    forwardRef,
    inject,
    InjectionToken,
    Input,
    OnInit,
    Renderer2,
} from '@angular/core';
import { takeUntil } from 'rxjs';
import { nameOf } from '../../../../utils/src';
import { MdOnDestroy } from '../../services/destroy/destroy.service';
import { IMdControllerChange, MdBaseControllerDirective } from '../base/base';

/**
 * This token uses a factory to create the directive instance with default params
 * in case if there is no directive from upper DI Tree
 */
export const MD_DISABLED = new InjectionToken<MdDisabledControllerDirective>(
    'MdDisabledControllerDirective',
    {
        factory: () => {
            const elementRef = inject(ElementRef);
            const renderer = inject(Renderer2);
            const mdOnDestroy = inject(MdOnDestroy);

            return new MdDisabledControllerDirective(
                elementRef,
                renderer,
                mdOnDestroy,
            );
        },
    },
);

const CSS_CLASS_NAME = 'md-disabled';

@Directive({
    selector: '[mdDisabled]',
    providers: [
        {
            provide: MD_DISABLED,
            useExisting: forwardRef(() => MdDisabledControllerDirective),
        },
    ],
})
export class MdDisabledControllerDirective
    extends MdBaseControllerDirective
    implements OnInit
{
    @Input('mdDisabled') disabled: boolean;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
        private readonly destroy$: MdOnDestroy,
    ) {
        super();
        this.disabled = false;
    }

    ngOnInit(): void {
        this.changes$
            .pipe(takeUntil(this.destroy$))
            .subscribe(({ changes }: IMdControllerChange) => {
                console.log(changes);

                const disabledSimpleChange =
                    changes[nameOf<MdDisabledControllerDirective>('disabled')];

                if (
                    disabledSimpleChange &&
                    disabledSimpleChange.currentValue !==
                        disabledSimpleChange.previousValue
                ) {
                    this.setCssClass();
                }
            });
    }

    private setCssClass(): void {
        if (this.disabled) {
            this.renderer.addClass(
                this.elementRef.nativeElement,
                CSS_CLASS_NAME,
            );
        } else {
            this.renderer.removeClass(
                this.elementRef.nativeElement,
                CSS_CLASS_NAME,
            );
        }
    }
}

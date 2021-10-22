import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    Renderer2,
    ViewEncapsulation,
} from '@angular/core';

type PrimitiveTypes = string | number;

@Component({
    selector: 'mdw-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MdwBadgeComponent<T extends PrimitiveTypes, W> {
    // private _removable: boolean;

    // @HostBinding('class.md-badge-large')
    // private _large: boolean;

    // @HostBinding('class.md-badge-small')
    // private _small: boolean;

    // @Input() set removable(value: boolean) {
    //     this._removable = convertToBoolean(value) || (value as unknown) === '';
    // }

    get removable(): boolean {
        return true;
        // return this._removable;
    }

    // @Input() set large(value) {
    //     this._large = convertToBoolean(value) || (value as unknown) === '';
    // }

    // get large(): boolean {
    //     return this._large;
    // }

    // @Input() set small(value) {
    //     this._small = convertToBoolean(value) || (value as unknown) === '';
    // }

    // get small(): boolean {
    //     return this._small;
    // }

    @Input() value: T | null;

    @Input() item?: W;

    @Output() public removed: EventEmitter<W>;

    constructor(
        private readonly renderer: Renderer2,
        private readonly elementRef: ElementRef
    ) {
        this.value = null;
        this.removed = new EventEmitter<W>();

        this.renderer.addClass(this.elementRef.nativeElement, 'md-badge-container');
    }

    public onRemove(): void {
        this.removed.emit(this.item);
    }
}

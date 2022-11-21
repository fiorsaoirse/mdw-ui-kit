import { Component } from '@angular/core';
import { MdBadgeColor, MdSize } from 'md-ui-kit/contracts';

@Component({
    templateUrl: './button.component.html',
})
export class ButtonTestComponent {
    small: MdSize;
    large: MdSize;
    disabled: boolean;

    color: typeof MdBadgeColor;

    private readonly colors: ReadonlyArray<MdBadgeColor>;
    private pointer: number;

    constructor() {
        this.small = MdSize.Small;
        this.large = MdSize.Large;
        this.disabled = true;

        this.color = MdBadgeColor;

        this.colors = [
            MdBadgeColor.Blue,
            MdBadgeColor.Gray,
            MdBadgeColor.Green,
            MdBadgeColor.Yellow,
        ];
        this.pointer = 0;
    }

    get currentColor(): MdBadgeColor {
        return this.colors[this.pointer];
    }

    switchColor() {
        this.pointer = (this.pointer + 1) % this.colors.length;
    }

    toggleDisabled(): void {
        this.disabled = !this.disabled;
    }

    log(): void {
        console.log('clicked!');
    }
}

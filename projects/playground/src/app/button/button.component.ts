import { Component } from '@angular/core';
import { MdButtonColor } from 'md-ui-kit/button';
import { MdSize } from 'md-ui-kit/common';

@Component({
    templateUrl: './button.component.html',
})
export class ButtonTestComponent {
    small: MdSize;
    large: MdSize;
    disabled: boolean;

    color: typeof MdButtonColor;

    private readonly colors: ReadonlyArray<MdButtonColor>;
    private pointer: number;

    constructor() {
        this.small = MdSize.Small;
        this.large = MdSize.Large;
        this.disabled = true;

        this.color = MdButtonColor;

        this.colors = [
            MdButtonColor.Blue,
            MdButtonColor.Orange,
            MdButtonColor.Green,
            MdButtonColor.Yellow,
            MdButtonColor.Red,
        ];
        this.pointer = 0;
    }

    get currentColor(): MdButtonColor {
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

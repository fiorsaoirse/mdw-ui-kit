import { Component } from '@angular/core';
import { MdBadgeColor, MdSize } from 'md-ui-kit/contracts';

@Component({
    templateUrl: './badge.component.html',
})
export class BadgeTestComponent {
    small: MdSize;
    large: MdSize;

    color: typeof MdBadgeColor;

    private readonly colors: ReadonlyArray<MdBadgeColor>;
    private pointer: number;

    constructor() {
        this.small = MdSize.Small;
        this.large = MdSize.Large;

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

    switchColor(): void {
        this.pointer = (this.pointer + 1) % this.colors.length;
    }

    log(): void {
        console.log('removed!');
    }
}

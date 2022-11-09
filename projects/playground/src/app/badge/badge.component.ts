import { Component } from '@angular/core';
import { MdBadgeColor, MdSize } from 'md-ui-kit/contracts';

@Component({
    templateUrl: './badge.component.html',
})
export class BadgeTestComponent {
    small: MdSize;
    large: MdSize;

    color: typeof MdBadgeColor;

    constructor() {
        this.small = MdSize.Small;
        this.large = MdSize.Large;

        this.color = MdBadgeColor;
    }
}

import { Component } from '@angular/core';
import { MdSize } from 'md-ui-kit/contracts';

@Component({
    templateUrl: './badge.component.html',
})
export class BadgeTestComponent {
    small: MdSize;
    large: MdSize;

    constructor() {
        this.small = MdSize.Small;
        this.large = MdSize.Large;
    }
}

import { Component } from '@angular/core';
import { MdSize } from '../../../projects/mdw-ui-kit/src/lib/shared';

@Component({
    templateUrl: './badge.component.html'
})
export class BadgeTestComponent {
    small: MdSize;
    large: MdSize;

    constructor() {
        this.small = MdSize.Small;
        this.large = MdSize.Large;
    }
}
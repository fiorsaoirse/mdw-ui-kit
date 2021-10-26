import { Component } from '@angular/core';
import { MdSize } from '../../../projects/mdw-ui-kit/src/lib/shared';

@Component({
    templateUrl: './button.component.html'
})
export class ButtonTestComponent {
    small: MdSize;
    large: MdSize;
    disabled: boolean;

    constructor() {
        this.small = MdSize.Small;
        this.large = MdSize.Large;
        this.disabled = true;
    }

    toggleDisabled(): void {
        this.disabled = !this.disabled;
    }

    log(): void {
        console.log('clicked!');
    }
}
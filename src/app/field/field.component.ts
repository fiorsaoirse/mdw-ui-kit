import { Component } from '@angular/core';

@Component({
    templateUrl: './field.component.html'
})
export class FieldTestComponent {
    plain: string | null;

    constructor() {
        this.plain = null;
    }
}
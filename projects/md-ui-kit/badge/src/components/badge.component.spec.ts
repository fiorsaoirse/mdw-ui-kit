import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MdBadgeColor, MdSize } from 'md-ui-kit/contracts';
import { MdBadgeModule } from '../badge.module';

@Component({
    template: ` <md-badge (remove)="onRemove()">{{ content }}</md-badge> `,
})
class HostComponent {
    color: MdBadgeColor;
    size: MdSize;

    content: string;

    constructor() {
        this.color = MdBadgeColor.Yellow;
        this.size = MdSize.Large;
        this.content = 'Badge';
    }
}

describe('MdBadgeComponent', () => {
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MdBadgeModule],
            declarations: [HostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);

        fixture.detectChanges();
    });

    it('Badge should be created with correct initial color', () => {
        expect(
            fixture.debugElement.query(By.css('.md-badge.md-badge-yellow')),
        ).toBeTruthy();

        expect(
            fixture.debugElement.query(By.css('.md-badge.md-badge-blue')),
        ).toBeFalsy();

        expect(
            fixture.debugElement.query(By.css('.md-badge.md-badge-green')),
        ).toBeFalsy();

        expect(
            fixture.debugElement.query(By.css('.md-badge.md-badge-gray')),
        ).toBeFalsy();
    });

    it('Badge should be created with correct initial size', () => {
        expect(
            fixture.debugElement.query(By.css('.md-badge.md-badge-medium')),
        ).toBeTruthy();

        expect(
            fixture.debugElement.query(By.css('.md-badge.md-badge-small')),
        ).toBeFalsy();

        expect(
            fixture.debugElement.query(By.css('.md-badge.md-badge-large')),
        ).toBeFalsy();
    });
});

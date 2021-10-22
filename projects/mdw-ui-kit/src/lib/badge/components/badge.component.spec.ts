import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '../common.module';
import { MdBadgeComponent } from './badge.component';

@Component({
    template: `
        <md-badge [removable]="removable" [large]="large" [small]="small" [value]="value" (remove)="log()"></md-badge>
    `,
})
class HostComponent {
    public removable: boolean;
    public large: boolean;
    public small: boolean;
    public value: string;

    constructor() {
        this.removable = false;
        this.large = false;
        this.small = false;
    }

    public log(): void {}

    public toggleRemovable(): void {
        this.removable = !this.removable;
    }

    public toggleLarge(): void {
        this.large = !this.large;
    }

    public toggleSmall(): void {
        this.small = !this.small;
    }
}

describe('MdBadgeComponent', () => {
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [HostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('MdBadge have to contain correct initial settings', () => {
        expect(fixture.debugElement.query(By.directive(MdBadgeComponent))).toBeTruthy();

        expect(fixture.debugElement.query(By.css('.md-badge-remove-button'))).toBeFalsy();
        expect(fixture.debugElement.query(By.css('.md-badge-large'))).toBeFalsy();
        expect(fixture.debugElement.query(By.css('.md-badge-small'))).toBeFalsy();

        expect(fixture.debugElement.query(By.directive(MdBadgeComponent)).nativeElement.textContent.trim()).toBe('');
    });

    it('MdBadge have to change badge value', () => {
        fixture.componentInstance.value = 'Test';
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.directive(MdBadgeComponent))).toBeTruthy();

        expect(fixture.debugElement.query(By.directive(MdBadgeComponent)).nativeElement.textContent.trim()).toBe(
            'Test'
        );
    });

    it('MdBadge have to be removable', () => {
        fixture.componentInstance.removable = true;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.directive(MdBadgeComponent))).toBeTruthy();

        expect(fixture.debugElement.query(By.css('.md-badge-remove-button'))).toBeTruthy();

        spyOn(fixture.componentInstance, 'log');

        fixture.debugElement.query(By.css('.md-badge-remove-button')).triggerEventHandler('click', {});

        expect(fixture.componentInstance.log).toHaveBeenCalled();
    });

    it('MdBadge have to be large', () => {
        fixture.componentInstance.large = true;
        fixture.detectChanges();

        const element = fixture.debugElement.query(By.directive(MdBadgeComponent));
        expect((element.nativeElement as HTMLElement).classList).toContain('md-badge-large');
    });

    it('MdBadge have to be small', () => {
        fixture.componentInstance.small = true;
        fixture.detectChanges();

        const element = fixture.debugElement.query(By.directive(MdBadgeComponent));
        expect((element.nativeElement as HTMLElement).classList).toContain('md-badge-small');
    });
});

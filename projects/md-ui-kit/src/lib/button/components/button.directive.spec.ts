import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MdButtonDirective } from './button.directive';
import { MdButtonModule } from '../button.module';

@Component({
    template: `<button md-button>Test</button> `,
})
class HostComponent { }

describe('MdButtonDirecrive', () => {
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MdButtonModule],
            declarations: [HostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        expect(fixture.componentInstance).toBeTruthy();
    });

    it('MdButton have to add special class to host element', () => {
        const button = fixture.debugElement.query(By.directive(MdButtonDirective));

        expect(button).toBeTruthy();
        expect((button.nativeElement as HTMLElement).classList).toContain('md-button');
    });
});

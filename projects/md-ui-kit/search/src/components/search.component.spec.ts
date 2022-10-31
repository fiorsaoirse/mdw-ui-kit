import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { CommonModule } from '../common.module';
import { MdSearchOptionComponent } from './search-option/search-option.component';
import { MdSearchComponent } from './search.component';

interface IItem {
    id: number;
    value: string;
}

@Component({
    template: `
        <md-search
            (searchInputChange)="onSearchChange($event)"
            (selectedItemChange)="onSelectChange($event)"
        >
            <md-search-option
                *ngFor="let option of options$ | async"
                [item]="option"
            >
                {{ option.value }}
            </md-search-option>
        </md-search>
    `,
})
class HostComponent {
    public options$: Observable<ReadonlyArray<IItem>>;

    public onSearchChange(): void {
        this.options$ = of([
            { id: 1, value: 'One' },
            { id: 2, value: 'Two' },
            { id: 3, value: 'Three' },
            { id: 4, value: 'Four' },
            { id: 5, value: 'Five' },
        ]);
    }

    public onSelectChange(): void {}
}

describe('MdSearchComponent', () => {
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [HostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        expect(fixture.componentInstance).toBeTruthy();
        fixture.detectChanges();
    });

    it('#onSearchChange method call', async () => {
        const element = fixture.debugElement.query(
            By.directive(MdSearchComponent),
        );
        expect(element).toBeTruthy();

        const options = fixture.debugElement.queryAll(
            By.directive(MdSearchOptionComponent),
        );
        expect(options.length).toBe(0);

        const input = element.query(By.css('.md-search-input'));

        (input.nativeElement as HTMLInputElement).value = 'Test';

        input.nativeElement.dispatchEvent(new InputEvent('input'));

        const wait = new Promise((resolve) => {
            setTimeout(() => {
                resolve(void 0);
            }, 510);
        });

        await wait;

        fixture.detectChanges();

        const optionsAfterInput = fixture.debugElement.queryAll(
            By.directive(MdSearchOptionComponent),
        );

        fixture.detectChanges();

        expect(optionsAfterInput.length).toBe(5);
    });
});

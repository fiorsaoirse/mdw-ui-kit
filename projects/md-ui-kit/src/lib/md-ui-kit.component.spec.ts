import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdUiKitComponent } from './md-ui-kit.component';

describe('MdUiKitComponent', () => {
    let component: MdUiKitComponent;
    let fixture: ComponentFixture<MdUiKitComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MdUiKitComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MdUiKitComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

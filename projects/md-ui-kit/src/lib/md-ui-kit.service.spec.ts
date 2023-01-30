import { TestBed } from '@angular/core/testing';

import { MdUiKitService } from './md-ui-kit.service';

describe('MdUiKitService', () => {
    let service: MdUiKitService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MdUiKitService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

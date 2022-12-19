import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
    BrowserModule,
    DomSanitizer,
    SafeHtml,
} from '@angular/platform-browser';
import { MdCommonModule, MdOnDestroy } from 'md-ui-kit/common';
import {
    catchError,
    Observable,
    of,
    ReplaySubject,
    startWith,
    switchMap,
    takeUntil,
} from 'rxjs';
import { MdSvgService } from '../services/svg.service';

@Component({
    selector: 'md-svg',
    templateUrl: './svg.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [BrowserModule, MdCommonModule],
    providers: [MdOnDestroy],
})
export class MdSvgComponent {
    private readonly urlChanges$: ReplaySubject<void>;
    private src: string;

    readonly innerHtml$: Observable<SafeHtml>;

    @Input() set url(value: string) {
        if (!value) {
            return;
        }

        this.src = value;
        this.urlChanges$.next();
    }

    constructor(
        private readonly domSanitazer: DomSanitizer,
        private readonly svgService: MdSvgService,
        private readonly destroy$: MdOnDestroy,
    ) {
        this.src = '';

        this.urlChanges$ = new ReplaySubject(1);

        this.innerHtml$ = this.urlChanges$.pipe(
            switchMap(() => this.svgService.getByUrl(this.src)),
            catchError((error) => {
                console.error(error);
                return of(this.domSanitazer.bypassSecurityTrustHtml(''));
            }),
            startWith(this.src),
            takeUntil(this.destroy$),
        );
    }
}

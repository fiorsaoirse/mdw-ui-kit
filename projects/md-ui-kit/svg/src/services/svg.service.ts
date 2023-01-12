import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { finalize, map, Observable, of, share, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MdSvgService {
    private readonly cache: Map<string, SafeHtml>;
    private readonly requestCache: Map<string, Observable<string>>;

    constructor(
        private readonly domSanitizer: DomSanitizer,
        private readonly httpClient: HttpClient,
    ) {
        this.cache = new Map();
        this.requestCache = new Map();
    }

    public getByUrl(url: string): Observable<SafeHtml> {
        const safeUrl = url;

        if (this.cache.has(safeUrl)) {
            return of(this.cache.get(safeUrl)!);
        }

        return this.loadByUrl(safeUrl).pipe(
            map((svgSource: string) => this.sanitize(svgSource)),
            tap((safeSource: SafeHtml) => {
                this.cache.set(safeUrl, safeSource);
            }),
        );
    }

    private sanitize(svgSource: string): SafeHtml {
        return this.domSanitizer.bypassSecurityTrustHtml(svgSource);
    }

    private loadByUrl(url: string): Observable<string> {
        if (this.requestCache.has(url)) {
            return this.requestCache.get(url)!;
        }

        const request = this.httpClient.get(url, { responseType: 'text' }).pipe(
            finalize(() => {
                this.requestCache.delete(url);
            }),
            share(),
        );

        this.requestCache.set(url, request);

        return request;
    }
}

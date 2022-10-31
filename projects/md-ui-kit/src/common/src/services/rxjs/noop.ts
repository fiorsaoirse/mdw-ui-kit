import { Observable, OperatorFunction, Subscriber, Subscription } from 'rxjs';

export function noop(): OperatorFunction<any, void> {
    return (source$: Observable<any>): Observable<void> => {
        return new Observable((subscriber: Subscriber<void>): Subscription => {
            return source$.subscribe({
                next: () => {
                    subscriber.next();
                },
                error: (error: any) => {
                    subscriber.error(error);
                },
                complete: () => {
                    subscriber.complete();
                },
            });
        });
    };
}

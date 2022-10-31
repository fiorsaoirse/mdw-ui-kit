import { Observable, OperatorFunction } from 'rxjs';

function noop(): OperatorFunction<any, void> {
  return (source$: Observable<any>): Observable<void> => {
    return new Observable(subscriber => {
      return source$.subscribe({
        next: () => {
          subscriber.next();
        },
        error: (error: any) => {
          subscriber.error(error);
        },
        complete: () => {
          subscriber.complete();
        }
      });
    });
  };
}

export { noop };


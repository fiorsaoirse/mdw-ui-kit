// import { ChangeDetectorRef, InjectionToken, Provider } from '@angular/core';
// import { merge, Observable } from 'rxjs';
// import { takeUntil, tap } from 'rxjs/operators';
// import {
//     MdDisabledControllerDirective,
//     MdOnDestroy, MdSize, MdSizeControllerDirective,
//     MD_DISABLED, MD_SIZE, noop
// } from '../../shared';

// const mdFieldRangeWatchedControllerFactory = (
//     changeDetectorRef: ChangeDetectorRef,
//     destroy$: MdOnDestroy,
//     ...controllers: [
//         MdSizeControllerDirective,
//         MdDisabledControllerDirective
//     ]
// ) => {

//     const mergedChanges$ = merge(...controllers.map(x => x.changes$))
//         .pipe(
//             tap(() => {
//                 changeDetectorRef.detectChanges();
//             }),
//             noop(),
//             takeUntil(destroy$)
//         );

//     mergedChanges$.subscribe();

//     return new MdFieldRangeWatchedController(mergedChanges$, ...controllers);
// };

// export const MD_FIELD_RANGE_WATCHED_CONTROLLER = new InjectionToken<MdFieldRangeWatchedController>(
//     'mdField controller that contains all property controllers for field range component: size, disable state etc.'
// );

// export const MD_FIELD_RANGE_WATCHED_PROVIDER: Provider = {
//     provide: MD_FIELD_RANGE_WATCHED_CONTROLLER,
//     deps: [
//         ChangeDetectorRef,
//         MdOnDestroy,
//         MD_SIZE,
//         MD_DISABLED
//     ],
//     useFactory: mdFieldRangeWatchedControllerFactory
// };

// export class MdFieldRangeWatchedController {
//     constructor(
//         readonly changes$: Observable<void>,
//         private readonly sizeDirective: MdSizeControllerDirective,
//         private readonly disabledDirective: MdDisabledControllerDirective
//     ) { }

//     public get disabled(): boolean {
//         return this.disabledDirective.disabled;
//     }

//     public get isSmall(): boolean {
//         return this.sizeDirective.size === MdSize.Small;
//     }

//     public get isMedium(): boolean {
//         return this.sizeDirective.size === MdSize.Medium;
//     }

//     public get isLarge(): boolean {
//         return this.sizeDirective.size === MdSize.Large;
//     }

//     public get size(): MdSize {
//         return this.sizeDirective.size;
//     }
// };

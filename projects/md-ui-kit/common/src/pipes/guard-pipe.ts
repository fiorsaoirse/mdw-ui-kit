import { Pipe, PipeTransform } from '@angular/core';
import { MdGuard } from '../contracts/content';

@Pipe({ name: 'mdGuardPipe' })
export class MdGuardPipe<T> implements PipeTransform {
    transform(value: any, guard: MdGuard<T>): T | undefined {
        return guard(value) ? value : undefined;
    }
}

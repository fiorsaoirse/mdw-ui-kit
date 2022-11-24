import { TemplateRef } from '@angular/core';
import { MdComponentContent } from './classes/component-content';

export type MdPrimitive = string | number | null | undefined;

export type MdContentType = 'primitive' | 'function' | 'template' | 'component';

export type MdContentHandler<T> = (context: T) => MdPrimitive;

export type MdContent<T = any> =
    | MdPrimitive
    | MdContentHandler<T>
    | TemplateRef<T>
    | MdComponentContent<T>;

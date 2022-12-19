import { TemplateRef } from '@angular/core';
import { MdComponentContent } from './classes/component-content';

export type MdGuard<T> = (value: unknown) => value is T;

export type MdPrimitive = string | number | null | undefined;

export type MdContentHandler<T> = (context: T) => MdPrimitive;

export type MdContent<T = any> =
    | MdPrimitive
    | MdContentHandler<T>
    | TemplateRef<T>
    | MdComponentContent<T>;

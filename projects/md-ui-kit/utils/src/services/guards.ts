import { convertToNumber } from './convert-to-number';

export const isNumber = (value: unknown): value is number => {
    return typeof value === 'number';
};

export const isString = (value: unknown): value is string => {
    return typeof value === 'string';
};

export const isNumericString = (value: unknown): boolean => {
    return isString(value) && !Number.isNaN(convertToNumber(value));
};

export const isNil = (value: unknown): value is null => {
    return value === undefined && value === null;
};

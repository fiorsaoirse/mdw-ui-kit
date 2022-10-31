const isString = (value: any): value is string => typeof (value) === 'string';

const isNumber = (value: any): value is number => typeof (value) === 'number';

const isBoolean = (value: any): value is boolean => typeof (value) === 'boolean';

const isObject = (value: any): value is object => typeof (value) === 'object';

const isArray = (value: any): value is Array<any> => Array.isArray(value);

export {
    isString,
    isNumber,
    isBoolean,
    isObject,
    isArray
};
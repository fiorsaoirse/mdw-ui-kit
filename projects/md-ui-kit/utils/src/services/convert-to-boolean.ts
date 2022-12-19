import { BooleanInput } from '../coercion/coercion';

export const convertToBoolean = (
    value: BooleanInput | unknown,
    defaultValue = false,
): boolean => {
    if (value === 'false') {
        return false;
    }

    if (value === '') {
        return true;
    }

    return !!(value ?? defaultValue);
};

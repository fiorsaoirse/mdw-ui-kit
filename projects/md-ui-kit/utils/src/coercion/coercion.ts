import { convertToBoolean } from '../services/convert-to-boolean';
import { convertToNumber } from '../services/convert-to-number';
import { isString } from '../services/guards';

export type BooleanInput = boolean | '' | 'true' | 'false';

export const coerceBooleanInput = (input: unknown): boolean => {
    return convertToBoolean(input);
};

export const coerceNumericInput = (input: unknown): number => {
    if (isString(input)) {
        return convertToNumber(input);
    }

    throw Error("Can't convert non-stringy value");
};

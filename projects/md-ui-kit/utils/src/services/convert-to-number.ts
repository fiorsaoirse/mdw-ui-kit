export const convertToNumber = (value: string, float = false): number => {
    return float ? Number.parseFloat(value) : Number.parseInt(value);
};

export const extractProperty = <T>(prop: Extract<keyof T, string>): string => {
    return prop;
};

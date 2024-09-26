// Input sanitization function
export const sanitizeInputValues = (values) => {
    Object.keys(values).forEach(key => {
        if (typeof values[key] === 'string') {
            values[key] = values[key].trim();
        }
    });
    return values;
};

export default sanitizeInputValues;

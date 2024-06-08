export const isXProfile = (input: string) => {
    // only allow format '@xxx'
    const regex = /^@[a-zA-Z0-9-]+$/;
    return regex.test(input);
};

export const isXPost = (input: string) => {
    // only allow format 'xxx/status/00100100101022022'
    const regex = /^[a-zA-Z0-9-]+\/status\/[0-9]+$/;
    return regex.test(input);
};

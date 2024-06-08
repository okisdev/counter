export const isUrl = (url: string) => {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    return regex.test(url.trim());
};

export const formatUrl = (url: string) => {
    return url.trim().replace(/^(https?:\/\/)/, '');
};

export const isGitHubProfile = (input: string) => {
    // only allow alphanumeric characters, hyphens, and underscores
    const regex = /^[a-zA-Z0-9-]+$/;
    return regex.test(input);
};

export const isGitHubRepo = (input: string) => {
    // only allow xxx/yyy format
    const regex = /^[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/;
    return regex.test(input);
};

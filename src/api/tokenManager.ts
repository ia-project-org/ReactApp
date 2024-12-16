// tokenManager.ts
let refreshTokenFn: () => Promise<void>;

export const setRefreshTokenHandler = (handler: () => Promise<void>) => {
    refreshTokenFn = handler;
};

export const getRefreshTokenHandler = () => refreshTokenFn;
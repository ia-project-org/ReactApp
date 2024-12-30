// tokenManager.ts
let refreshTokenFn: () => Promise<void>;


export const getRefreshTokenHandler = () => refreshTokenFn;
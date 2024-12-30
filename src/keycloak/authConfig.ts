// src/config/authConfig.ts
export const KEYCLOAK_CONFIG = {
    REALM: import.meta.env.VITE_PUBLIC_KEYCLOAK_REALM,
    CLIENT_ID: import.meta.env.VITE_PUBLIC_KEYCLOAK_CLIENT_ID,
    CLIENT_SECRET: import.meta.env.VITE_PUBLIC_KEYCLOAK_CLIENT_SECRET,
    BASE_URL: import.meta.env.VITE_PUBLIC_KEYCLOAK_URL,
};

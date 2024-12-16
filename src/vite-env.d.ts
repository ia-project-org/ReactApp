interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_PUBLIC_KEYCLOAK_REALM: string;
    readonly VITE_PUBLIC_KEYCLOAK_CLIENT_ID: string;
    readonly VITE_PUBLIC_KEYCLOAK_CLIENT_SECRET: string;
    readonly VITE_PUBLIC_KEYCLOAK_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

import { createRemoteJWKSet, jwtVerify } from 'jose';
import {KEYCLOAK_CONFIG} from "@/keycloak/authConfig.ts";

const JWKS_URL = `${KEYCLOAK_CONFIG.BASE_URL}/realms/${KEYCLOAK_CONFIG.REALM}/protocol/openid-connect/certs`;
console.log(JWKS_URL);
const jwks = createRemoteJWKSet(new URL(JWKS_URL));

export const verifyToken = async (token: string) => {
    const { payload } = await jwtVerify(token, jwks);
    return payload;
};

export const getToken = () => {
    return localStorage.getItem('jwtToken') || null;
};

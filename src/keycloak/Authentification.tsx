import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {createRemoteJWKSet, jwtVerify} from 'jose';
import {User} from "oidc-client";
import {jwtDecode} from "jwt-decode";
import {useAppContext} from "@/context/AppContext";
import {AxiosInstance} from "axios";
import {AuthState} from "@/keycloak/AuthState.ts";
import {KEYCLOAK_CONFIG} from "@/keycloak/authConfig.ts";

// Custom JWT Payload interface
interface CustomJwtPayload {
    name?: string;
    sub?: string;
    preferred_username?: string;
    realm_access?: {
        roles?: string[];
    };
    exp?: number;
    iat?: number;
}

// AuthContext
const AuthContext = createContext<AuthState | undefined>(undefined);

// Keycloak's JWKS URL
const JWKS_URL = `${KEYCLOAK_CONFIG.BASE_URL}/realms/${KEYCLOAK_CONFIG.REALM}/protocol/openid-connect/certs`;

// Authentication Provider Component
const Authentication: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const { setConnectedAgent, setAccessToken } = useAppContext();

    // Verify token
    const verify = async (token: string) => {
        try {
            // Create a remote JWK Set
            const jwks = createRemoteJWKSet(new URL(JWKS_URL));
            // Verify the token directly
            const { payload } = await jwtVerify(token, jwks, {
                algorithms: ['RS256'], // Keycloak usually uses RS256
                issuer: `${KEYCLOAK_CONFIG.BASE_URL}/realms/${KEYCLOAK_CONFIG.REALM}`, // Match your Keycloak realm's issuer
            });
            return payload;
        } catch (error) {
            console.error('Token verification failed:', error);
            return null;
        }
    };


    // Get current user
    const getUser = () => user;

    // Check if user is authenticated
    const userIsAuthenticated = () => !!user;

    // Get stored token
    const getToken = () => {
        return localStorage.getItem('jwtToken') || null;
    };

    const userLogin = async (username: string, password: string) => {
        const response = await fetch(`${KEYCLOAK_CONFIG.BASE_URL}/realms/${KEYCLOAK_CONFIG.REALM}/protocol/openid-connect/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'password',
                client_id: KEYCLOAK_CONFIG.CLIENT_ID,
                username,
                password,
                client_secret: KEYCLOAK_CONFIG.CLIENT_SECRET,
                scope: 'openid profile'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const tokenResponse = await response.json();
        await verify(tokenResponse.access_token);

        const newUser = new User({
            access_token: tokenResponse.access_token,
            id_token: tokenResponse.id_token,
            refresh_token: tokenResponse.refresh_token,
            token_type: tokenResponse.token_type,
            scope: tokenResponse.scope,
            expires_at: Date.now() + (tokenResponse.expires_in * 1000),
            session_state: tokenResponse.session_state,
            profile: tokenResponse.profile,
            state: tokenResponse.state
        });

        setUser(newUser);

        const decodedToken = jwtDecode(tokenResponse.access_token) as CustomJwtPayload;
        setConnectedAgent({
            agentId: 1,
            password: "",
            username: decodedToken.name || decodedToken.preferred_username || ''
        });

        localStorage.setItem('jwtToken', tokenResponse.access_token);
        localStorage.setItem('refreshToken', tokenResponse.refresh_token);
        localStorage.setItem('tokenExpiry', (Date.now() + (tokenResponse.expires_in * 1000)).toString());

        return newUser;
    };

    // Sign Out
    const signOut = async () => {
        try {
            // Optional: Call Keycloak logout endpoint if needed
            await fetch(`${KEYCLOAK_CONFIG.BASE_URL}/realms/${KEYCLOAK_CONFIG.REALM}/protocol/openid-connect/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    client_id: KEYCLOAK_CONFIG.CLIENT_ID,
                    client_secret: KEYCLOAK_CONFIG.CLIENT_SECRET,
                    refresh_token: localStorage.getItem('refreshToken') || ''
                })
            });
            // eslint-disable-next-line no-useless-catch
        } catch (error) {
            throw error
        } finally {
            // Always clear local storage and reset state
            setUser(null);
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('tokenExpiry');
            window.location.href = '/';
        }
    };

    // Refresh Token
    const refreshToken = async () => {
        const refreshTokenValue = localStorage.getItem('refreshToken');

        if (!refreshTokenValue) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await fetch(`${KEYCLOAK_CONFIG.BASE_URL}/realms/${KEYCLOAK_CONFIG.REALM}/protocol/openid-connect/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    client_id: KEYCLOAK_CONFIG.CLIENT_ID,
                    refresh_token: refreshTokenValue,
                    client_secret: KEYCLOAK_CONFIG.CLIENT_SECRET
                })
            });

            if (response.ok) {
                const tokenResponse = await response.json();

                // Verify the new token
                await verify(tokenResponse.access_token);

                const updatedUser = new User({
                    access_token: tokenResponse.access_token,
                    id_token: tokenResponse.id_token,
                    refresh_token: tokenResponse.refresh_token,
                    token_type: tokenResponse.token_type,
                    scope: tokenResponse.scope,
                    expires_at: Date.now() + (tokenResponse.expires_in * 1000),
                    session_state: tokenResponse.session_state,
                    profile: tokenResponse.profile,
                    state: tokenResponse.state
                });

                setUser(updatedUser);
                localStorage.setItem('jwtToken', tokenResponse.access_token);
                localStorage.setItem('refreshToken', tokenResponse.refresh_token);
                localStorage.setItem('tokenExpiry', (Date.now() + (tokenResponse.expires_in * 1000)).toString());

                return updatedUser;
            } else {
                await signOut();
                throw new Error('Failed to refresh token');
            }
        } catch (error) {

            await signOut();
            throw error;
        }
    };

    // Axios Interceptors
    const setupAxiosInterceptors = (axiosInstance: AxiosInstance) => {
        // Request Interceptor
        axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('jwtToken');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response Interceptor
        axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                // Check if it's an unauthorized error and we haven't retried
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        // Attempt to refresh the token
                        await refreshToken();

                        // Get the new token and update the request
                        const newToken = localStorage.getItem('jwtToken');
                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                        // Retry the original request
                        return axiosInstance(originalRequest);
                    } catch (refreshError) {
                        // Force logout if refresh fails
                        await signOut();
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );
    };

    // Token Check Hook
    const useTokenCheck = () => {
        useEffect(() => {
            const checkTokenValidity = async () => {
                const storedToken = localStorage.getItem('jwtToken');
                const tokenExpiry = localStorage.getItem('tokenExpiry');

                if (storedToken && tokenExpiry) {
                    try {
                        // Check if token is expired or about to expire (within 5 minutes)
                        const isExpired = Date.now() >= parseInt(tokenExpiry) - (5 * 60 * 1000);

                        if (isExpired) {
                            // Attempt to refresh token
                            await refreshToken();
                        } else {
                            // Verify the existing token
                            await verify(storedToken);

                            const decodedToken = jwtDecode(storedToken) as CustomJwtPayload;
                            setConnectedAgent({
                                agentId: 1,
                                username: decodedToken.name || decodedToken.preferred_username || '',
                                password: ""
                            });
                            setAccessToken(storedToken);
                        }
                    } catch (error) {
                        await signOut();
                        throw error
                    }
                }
            };

            checkTokenValidity();
        }, []);
    };

    // Context Value
    const contextValue: AuthState = {
        user,
        getUser,
        userIsAuthenticated,
        userLogin,
        signOut,
        getToken,
        refreshToken,
        setupAxiosInterceptors,
        useTokenCheck
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { AuthContext, Authentication };
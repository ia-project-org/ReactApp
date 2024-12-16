import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { User } from "oidc-client";
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "@/context/AppContext";
import { AxiosInstance } from "axios";
import {AuthState} from "@/keycloak/AuthState.ts";

// Custom JWT Payload interface
interface CustomJwtPayload {
    name?: string;
    sub?: string;
    preferred_username?: string;
    realm_access?: {
        roles?: string[];
    };
}


// Create the AuthContext
const AuthContext = createContext<AuthState | undefined>(undefined);

// Keycloak GAWKS URL
const JWKS_URL = 'http://localhost:8080/realms/e-banking/protocol/openid-connect/certs';

// Create a remote JWK Set
const jwks = createRemoteJWKSet(new URL(JWKS_URL));

// Authentication Provider Component
const Authentification: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const { setConnectedAgent, setAccessToken } = useAppContext();

    // Verify token
    const verify = async (token: string) => {
        try {
            const { payload } = await jwtVerify(token, jwks);
            return payload;
        } catch (error) {
            throw new Error('Invalid or expired token');
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

    // User Login
    const userLogin = async (username: string, password: string) => {
        try {
            const response = await fetch(`http://localhost:8080/realms/e-banking/protocol/openid-connect/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'password',
                    client_id: 'e-banking-rest-api',
                    username,
                    password,
                    client_secret: 'QBafFQGFvlGsvttMMBX7Qa6urFrr7RsG',
                    scope: 'openid profile'
                })
            });

            if (response.ok) {
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

                return newUser;
            }
        } catch (error) {
            console.error('Login failed', error);
            throw new Error('Failed to login');
        }
    };

    // Sign Out
    const signOut = () => {
        setUser(null);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
    };

    // Refresh Token
    const refreshToken = async () => {
        const refreshTokenValue = localStorage.getItem('refreshToken');

        if (!refreshTokenValue) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await fetch(`http://localhost:8080/realms/e-banking/protocol/openid-connect/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    grant_type: 'refresh_token',
                    client_id: 'e-banking-rest-api',
                    refresh_token: refreshTokenValue,
                    client_secret: 'QBafFQGFvlGsvttMMBX7Qa6urFrr7RsG'
                })
            });

            if (response.ok) {
                const tokenResponse = await response.json();

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

                return updatedUser;
            } else {
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('refreshToken');
                signOut();
            }
        } catch (error) {
            signOut();
            throw error;
        }
    };

    // Axios Interceptors
    const setupAxiosInterceptors = (axiosInstance: AxiosInstance) => {
        axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        await refreshToken();

                        const storedToken = localStorage.getItem('jwtToken');
                        originalRequest.headers['Authorization'] = `Bearer ${storedToken}`;

                        return axiosInstance(originalRequest);
                    } catch (refreshError) {
                        console.error('Token refresh failed', refreshError);
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('refreshToken');
                        window.location.href = '/';
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
            const storedToken = localStorage.getItem('jwtToken');
            if (storedToken) {
                verify(storedToken)
                    .then(() => {
                        const decodedToken = jwtDecode(storedToken) as CustomJwtPayload;
                        setConnectedAgent({
                            agentId: 1,
                            username: decodedToken.name || decodedToken.preferred_username || '',
                            password: ""
                        });
                        setAccessToken(storedToken);
                    })
                    .catch(error => {
                        console.error('Stored token verification failed', error);
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('refreshToken');
                        window.location.href = '/';
                    });
            }
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



export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { AuthContext, Authentification };
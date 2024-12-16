import {User} from "oidc-client";
import {AxiosInstance} from "axios";

export interface AuthState{

    user: User | null;
    getUser: () => User | null;

    userIsAuthenticated: () => boolean;
    userLogin: (username: string, password: string) => Promise<User | undefined>;
    signOut: () => void;
    getToken: () => string | null;
    refreshToken: () => Promise<User | undefined>;
    setupAxiosInterceptors: (axiosInstance: AxiosInstance) => void;
    useTokenCheck: () => void;

}
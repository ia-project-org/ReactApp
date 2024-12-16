import React, {useEffect} from "react";
import {createBrowserRouter, Navigate, Outlet, RouterProvider, useLocation} from "react-router-dom";
import Dashboard from "@/components/dashboard/Dashboard.tsx";
import ClientTable from "@/components/dashboard/page.tsx";
import './App.css';
import Upload from "@/pages/upload.tsx";
import Navbar from "@/components/dashboard/navbar/Navbar.tsx";
import Login from "@/pages/login.tsx";
import Recommendations from "@/pages/Recommendations.tsx";
import {useAuth} from "@/keycloak/Authentification.tsx";
import axiosInstance from "@/api/axiosInstance.ts";

const RootLayout: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <>
            {currentPath !== '/' && <Navbar />}
            <Outlet />
        </>
    );
};

const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const {userIsAuthenticated} = useAuth();

    if (!userIsAuthenticated()) {
        return <Navigate to="/" replace />;
    }
    return element; // Render element if authenticated
};

const App: React.FC = () => {

    const {useTokenCheck,userIsAuthenticated,refreshToken,signOut,setupAxiosInterceptors} = useAuth();

    // Check token on app initialization
    useTokenCheck();

    // Setup axios interceptors
    useEffect(() => {
        setupAxiosInterceptors(axiosInstance);
        // Vérification périodique du token
        const checkTokenValidity = async () => {
            if (userIsAuthenticated()) {
                try {
                    await refreshToken();
                } catch (error) {
                    // Déconnexion si refresh impossible
                    signOut();
                }
            }
        };

        // Vérification toutes les heures par exemple
        const intervalId = setInterval(checkTokenValidity, 3600000);

        return () => clearInterval(intervalId);
    }, []);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                {
                    index: true,
                    element: <Login />,
                },
                {
                    path: "upload",
                    element: <PrivateRoute element={ <main><Upload /></main>} />,
                },
                {
                    path: "table",
                    element: <PrivateRoute element={ <main className="p-4"><ClientTable /></main>} />,
                },
                {
                    path: "dashboard",
                    element: <PrivateRoute element={<main className="p-4"><Dashboard /></main>} />,
                },
                {
                    path: "recommendations",
                    element: <PrivateRoute element={<main className="p-4"><Recommendations /></main>} />,
                },
                {
                    path: "*",
                    element: <Navigate to="/" replace />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
};

export default App;
